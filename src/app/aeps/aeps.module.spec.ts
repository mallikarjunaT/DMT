import { AepsModule } from './aeps.module';

describe('AepsModule', () => {
  let aepsModule: AepsModule;

  beforeEach(() => {
    aepsModule = new AepsModule();
  });

  it('should create an instance', () => {
    expect(aepsModule).toBeTruthy();
  });
});
