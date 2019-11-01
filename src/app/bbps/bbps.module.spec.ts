import { BbpsModule } from './bbps.module';

describe('BbpsModule', () => {
  let bbpsModule: BbpsModule;

  beforeEach(() => {
    bbpsModule = new BbpsModule();
  });

  it('should create an instance', () => {
    expect(bbpsModule).toBeTruthy();
  });
});
