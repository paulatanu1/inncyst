import { TestBed } from '@angular/core/testing';

import { LocationScriptService } from './location-script.service';

describe('LocationScriptService', () => {
  let service: LocationScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
