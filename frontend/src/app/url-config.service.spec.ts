import { TestBed } from '@angular/core/testing';

import { UrlConfigService } from './url-config.service';

describe('UrlConfigService', () => {
  let service: UrlConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
