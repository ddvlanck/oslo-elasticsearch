import type { OptionValues } from 'commander';
const fs = require('fs');
const path = require('path');

export class Configuration {
  public readonly apiEndpoint: string;
  public searchVocabulary: boolean;
  public searchApplicationProfile: boolean;
  public keywords: string[];

  public constructor() {
    // eslint-disable-next-line no-process-env
    const apiEndpoint = process.env.API_ENDPOINT;

    if (!apiEndpoint) {
      throw new Error(`Please provide an API endpoint that can be queries.`);
    }

    this.apiEndpoint = apiEndpoint;
  }

  public processInputOptions(options: OptionValues): void {
    this.searchVocabulary = Boolean(options.vocabulary);
    this.searchApplicationProfile = Boolean(options.applicationProfile);
    this.keywords = options.keys;
  }
}

export const configuration = new Configuration();
