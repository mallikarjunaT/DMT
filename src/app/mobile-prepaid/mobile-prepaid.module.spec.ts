import { MobilePrepaidModule } from './mobile-prepaid.module';

describe('MobilePrepaidModule', () => {
  let mobilePrepaidModule: MobilePrepaidModule;

  beforeEach(() => {
    mobilePrepaidModule = new MobilePrepaidModule();
  });

  it('should create an instance', () => {
    expect(mobilePrepaidModule).toBeTruthy();
  });
});
