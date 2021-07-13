import { Client } from '@elastic/elasticsearch';
import { QueryProcessor } from '../lib/QueryProcessor';
const Mock = require('@elastic/elasticsearch-mock');

describe('QueryProcessor entity', () => {
  let client: Client;
  let processor: QueryProcessor;

  beforeAll(() => {
    processor = new QueryProcessor();

    const mock = new Mock();
    client = new Client({
      node: 'http://localhost:9200',
      Connection: mock.getConnection(),
    });

    mock.add({
      method: 'GET',
      path: [ '/oslo-terminology/_search' ],
    }, () => ({
      message: 'mock function works',
    }));
  });

  it('should be a function.', () => {
    expect(QueryProcessor).toBeInstanceOf(Function);
  });

  it('should be a QueryProcessor constructor.', () => {
    expect(new (<any> QueryProcessor)()).toBeInstanceOf(QueryProcessor);
  });

  it('should not be able to create a new QueryProcessor object without "new".', () => {
    expect(() => {
      (<any> QueryProcessor)();
    }).toThrow();
  });

  // TODO: fix this test
  // it('should push the resulting response of each keyword on the stream', () => {
  // const promise = client.search({
  //     index: 'oslo-terminology',
  //     body: {
  //       size: 10_000,
  //       query: {
  //         query_string: {
  //           query: `*persoon*`,
  //           fields: [ 'prefLabel' ],
  //         },
  //       },
  //     },
  // });
  //
  // const stream = new Readable({ objectMode: true });
  // stream._read = () => { };
  // });
});
