import { URL } from 'url';
import type { ITerm } from './Term';

export class ApplicationProfileTerm implements ITerm {
    public identifier: URL;
    public label: string;
    public definition: string;
    public contextUri: URL;

    public localIdentifier: URL;
    public properties?: ApplicationProfileTerm[];

    public constructor(identifier: string,
        label: string,
        definition: string,
        context: string,
        localIdentifier: string,
        properties?: ApplicationProfileTerm[]) {
        this.identifier = new URL(identifier);
        this.label = label;
        this.definition = definition;
        this.contextUri = new URL(context);
        this.localIdentifier = new URL(localIdentifier);
        this.properties = properties;
    }
}

export class ApplicationProfile {
    public createDocument(data: any): any {
        const terms = new Array<ApplicationProfileTerm>();
        const baseUri = data.metadata.navigation.self;
        const context = data.metadata.uri;

        for (const object of data.classes) {
            const properties = new Array<ApplicationProfileTerm>();

            for (const propertyObject of object.properties) {
                if (propertyObject.name.nl) {
                    const localIdentifier = encodeURI(`${baseUri}#${object.name.nl}.${propertyObject.name.nl}`);
                    const property = new ApplicationProfileTerm(
                        propertyObject.uri,
                        propertyObject.name.nl,
                        propertyObject.description.nl,
                        context,
                        localIdentifier,
                    );

                    properties.push(property);
                }
            }

            const localIdentifier = encodeURI(`${baseUri}#${object.name.nl}`);
            const classTerm = new ApplicationProfileTerm(
                object.uri,
                object.name.nl,
                object.description.nl,
                context,
                localIdentifier,
                properties,
            );

            terms.push(classTerm);
        }

        return terms;
    }
}
