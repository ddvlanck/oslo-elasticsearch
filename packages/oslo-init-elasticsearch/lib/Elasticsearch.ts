import { Client } from '@elastic/elasticsearch';

export class Elasticsearch {
  private readonly client: Client;

  public constructor(apiEndpoint: string) {
    this.client = this.initClient(apiEndpoint);
    this.checkStatus();
  }

  private initClient(apiEndpoint: string): Client {
    return new Client({
      node: apiEndpoint,
    });
  }

  private checkStatus(): void {
    this.client.ping()
      .catch(() => {
        throw new Error(`Can not connect to the Elasticsearch instance. Make sure you have to correct configuration.`);
      });
  }

  public async query(key: string, vocabulary: boolean, applicationProfile: boolean): Promise<any> {
    if (applicationProfile) {
      throw new Error(`Not available yet.`);
    }

    const body = this.createVocabularyQueryBody(key);

    return this.client.search({
      index: 'oslo-terminology',
      body,
    });
  }

  public createVocabularyQueryBody(key: string): any {
    return {
      size: 10_000,
      query: {
        query_string: {
          query: `*${key}*`,
          fields: [ 'prefLabel' ],
        },
      },
    };
  }
}
