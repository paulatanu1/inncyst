import { TestBed } from '@angular/core/testing';

import { IndustryCheckGuard } from './industry-check.guard';

describe('IndustryCheckGuard', () => {
  let guard: IndustryCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IndustryCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
