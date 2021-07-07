import type { OptionValues } from 'commander';

const fs = require('fs');

export class Configuration {
  public readonly apiEndpoint: string;
  public searchVocabulary: boolean;
  public searchApplicationProfile: boolean;
  public keywords: string[];

  public constructor() {
    const rawdata = fs.readFileSync('config.json', 'utf8');
    const data = JSON.parse(rawdata);

    this.apiEndpoint = data.apiEndpoint;
  }

  public processInputOptions(options: OptionValues): void {
    this.searchVocabulary = Boolean(options.vocabulary);
    this.searchApplicationProfile = Boolean(options.applicationProfile);
    this.keywords = options.keys;
  }
}

export const configuration = new Configuration();
