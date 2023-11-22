import { TestBed } from '@angular/core/testing';

import { UserVerificationGuard } from './user-verification.guard';

describe('UserVerificationGuard', () => {
  let guard: UserVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
