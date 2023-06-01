import { TestBed } from '@angular/core/testing';

import { LastUrlService } from './last-url.service';

describe('LastUrlService', () => {
  let service: LastUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
