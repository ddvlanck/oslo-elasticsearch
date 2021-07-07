import type { Readable } from 'stream';
import type { ApiResponse } from '@elastic/elasticsearch';

export class QueryProcessor {
  public async processResults(queries: Promise<ApiResponse<Record<string, any>, unknown>[]>,
    stream: Readable): Promise<void> {
    const responses = await Promise.all([ queries ]);

    for (const response of responses) {
      response[0].body.hits.hits
        .map((result: any) =>
          stream.push(JSON.stringify(result)));
    }
  }
}
