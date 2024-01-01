import { TestBed } from '@angular/core/testing';

import { JobPostApiService } from './job-post-api.service';

describe('JobPostApiService', () => {
  let service: JobPostApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPostApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
