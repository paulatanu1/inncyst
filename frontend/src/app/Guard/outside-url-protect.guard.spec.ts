import { TestBed } from '@angular/core/testing';

import { OutsideUrlProtectGuard } from './outside-url-protect.guard';

describe('OutsideUrlProtectGuard', () => {
  let guard: OutsideUrlProtectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OutsideUrlProtectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
