import { ApplicationProfile } from './interfaces/ApplicationProfile';
import { Vocabulary } from './interfaces/Vocabulary';

const fetch = require('node-fetch');

export class Orchestrator {
    private readonly file: string;
    private readonly type: string;

    public constructor(file: string, type: string) {
        this.file = file;
        this.type = type;
    }

    public async run(): Promise<void> {
        const data = await this.fetch();
        const typeClass = this.getTypeClass();

        const document = typeClass.createDocument(data);
        // TODO: add elasticsearch
    }

    private fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(this.file)
                .then((res: any) => res.json())
                .then((json: any) => resolve(json))
                .catch((error: any) => reject(error));
        });
    }

    private getTypeClass(): any {
        switch (this.type) {
            case 'vocabulary':
                return new Vocabulary();

            case 'applicationProfile':
                return new ApplicationProfile();
        }
    }
}
