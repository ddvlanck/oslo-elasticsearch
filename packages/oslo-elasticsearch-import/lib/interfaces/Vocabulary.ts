import { URL } from 'url';
import type { ITerm } from './Term';

export class VocabularyTerm implements ITerm {
    public identifier: URL;
    public label: string;
    public definition: string;
    public contextUri: URL;

    public constructor(identifierString: string, label: string, definition: string, context: string) {
        this.identifier = new URL(identifierString);
        this.label = label;
        this.definition = definition;
        this.contextUri = new URL(context);
    }
}

export class Vocabulary {
    public createDocument(data: any): VocabularyTerm[] {
        const terms = new Array<VocabularyTerm>();
        const context = data.metadata.uri;

        const mergedVocabularyObjects = Object.prototype.hasOwnProperty.call(data, 'external_terms') ?
            data.classes.concact(data.properties, data.external_terms) :
            data.classes.concat(data.properties);

        for (const object of mergedVocabularyObjects) {
            const vocabularyTerm = new VocabularyTerm(
                object.uri,
                object.name.nl,
                object.description.nl,
                context,
            );

            terms.push(vocabularyTerm);
        }

        return terms;
    }
}
