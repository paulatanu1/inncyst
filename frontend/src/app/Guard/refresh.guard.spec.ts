import { TestBed } from '@angular/core/testing';

import { RefreshGuard } from './refresh.guard';

describe('RefreshGuard', () => {
  let guard: RefreshGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RefreshGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
