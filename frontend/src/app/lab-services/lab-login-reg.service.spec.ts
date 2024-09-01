import { TestBed } from '@angular/core/testing';

import { LabLoginRegService } from './lab-login-reg.service';

describe('LabLoginRegService', () => {
  let service: LabLoginRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabLoginRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
