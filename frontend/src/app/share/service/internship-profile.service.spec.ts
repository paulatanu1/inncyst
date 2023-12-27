import { TestBed } from '@angular/core/testing';

import { InternshipProfileService } from './internship-profile.service';

describe('InternshipProfileService', () => {
  let service: InternshipProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternshipProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
