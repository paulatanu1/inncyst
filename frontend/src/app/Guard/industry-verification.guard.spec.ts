import { TestBed } from '@angular/core/testing';

import { IndustryVerificationGuard } from './industry-verification.guard';

describe('IndustryVerificationGuard', () => {
  let guard: IndustryVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IndustryVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
