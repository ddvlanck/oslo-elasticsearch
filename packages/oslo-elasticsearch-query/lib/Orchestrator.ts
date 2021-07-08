import { Readable } from 'stream';
import { Elasticsearch } from '@oslo/elasticsearch-init';
import { configuration } from './Configuration';
import { QueryProcessor } from './QueryProcessor';

export class Orchestrator {
  private readonly elasticsearch: Elasticsearch;

  public constructor() {
    this.elasticsearch = new Elasticsearch(configuration.apiEndpoint);
  }

  public async run(): Promise<Readable> {
    const queries = Promise.all(configuration.keywords
      .map(key =>
        this.elasticsearch.query(key,
          configuration.searchVocabulary,
          configuration.searchApplicationProfile)));

    const stream = new Readable({ objectMode: true });

    const queryProcessor = new QueryProcessor();
    const result = await queryProcessor.processResults(queries, stream);

    return stream;
  }
}
