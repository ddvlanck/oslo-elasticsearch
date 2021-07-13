import type { OptionValues } from 'commander';
import { Configuration } from '../lib/Configuration';

describe('Configuration entity', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should be a function.', () => {
    expect(Configuration).toBeInstanceOf(Function);
  });

  it('should be a Configuration constructor.', () => {
    expect(new (<any> Configuration)()).toBeInstanceOf(Configuration);
  });

  it('should not be able to create a new Configuration object without "new".', () => {
    expect(() => {
      (<any> Configuration)();
    }).toThrow();
  });

  it('should throw an error when process.env does not have the right variable', () => {
    process.env.API_ENDPOINT = '';
    expect(() => {
      (<any> new Configuration())();
    }).toThrow();
    expect(() => {
      (<any> new Configuration())();
    }).toThrow(`Please provide an API endpoint that can be queried.`);
  });

  it('should process the input options', () => {
    const testConfig = new Configuration();
    const inputOptions: OptionValues = {
      vocbulary: false,
      applicationProfile: true,
      keys: [ 'persoon' ],
    };

    testConfig.processInputOptions(inputOptions);

    expect(testConfig.searchVocabulary).toBe(false);
    expect(testConfig.searchApplicationProfile).toBe(true);
    expect(testConfig.keywords).toEqual([ 'persoon' ]);
  });
});
