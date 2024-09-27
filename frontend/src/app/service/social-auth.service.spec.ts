import { TestBed } from '@angular/core/testing';

import { SocialAuthService } from './social-auth.service';

describe('SocialAuthService', () => {
  let service: SocialAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
