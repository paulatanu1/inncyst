import { TestBed } from '@angular/core/testing';

import { JobPostListService } from './job-post-list.service';

describe('JobPostListService', () => {
  let service: JobPostListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPostListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
