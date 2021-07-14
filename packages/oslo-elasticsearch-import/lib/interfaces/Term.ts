import type { URL } from 'url';

export interface ITerm {
    identifier: URL;
    label: string;
    definition: string;
    contextUri: URL;
}
