import { TestBed } from '@angular/core/testing';

import { JobListApiService } from './job-list-api.service';

describe('JobListApiService', () => {
  let service: JobListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
