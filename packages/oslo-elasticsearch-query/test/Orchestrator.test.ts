import { Readable } from 'stream';
import { configuration } from '../lib/Configuration';
import { Orchestrator } from '../lib/Orchestrator';

describe('Orchestrator entity', () => {
  let orchestrator: Orchestrator;

  beforeAll(() => {
    configuration.processInputOptions({
      vocabulary: true,
      applicationProfile: false,
      keys: [ 'persoon' ],
    });

    orchestrator = new Orchestrator();
  });

  it('should be a function.', () => {
    expect(Orchestrator).toBeInstanceOf(Function);
  });

  it('should be a Configuration constructor.', () => {
    expect(new (<any> Orchestrator)()).toBeInstanceOf(Orchestrator);
  });

  it('should not be able to create a new Configuration object without "new".', () => {
    expect(() => {
      (<any> Orchestrator)();
    }).toThrow();
  });

  it('should return a Readable stream when "run" method is executed', () => {
    expect(orchestrator.run()).toBeInstanceOf(Readable);
  });
});
