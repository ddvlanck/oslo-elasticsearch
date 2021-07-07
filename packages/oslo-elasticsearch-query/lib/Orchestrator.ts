import { Readable } from 'stream';
import { Elasticsearch } from '@oslo/elasticsearch-init';
import { configuration } from './Configuration';
import { QueryProcessor } from './QueryProcessor';

export class Orchestrator {
  private readonly elasticsearch: Elasticsearch;

  public constructor() {
    this.elasticsearch = new Elasticsearch(configuration.apiEndpoint);
  }

  public run(): Readable {
    const queries = Promise.all(configuration.keywords
      .map(key =>
        this.elasticsearch.query(key,
          configuration.searchVocabulary,
          configuration.searchApplicationProfile)));

    const stream = new Readable({ objectMode: true });
    stream._read = () => {};

    const queryProcessor = new QueryProcessor();
    const result = queryProcessor.processResults(queries, stream);

    return stream;
  }
}
