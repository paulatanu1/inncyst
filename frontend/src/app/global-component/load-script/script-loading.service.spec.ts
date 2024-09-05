import { TestBed } from '@angular/core/testing';

import { ScriptLoadingService } from './script-loading.service';

describe('ScriptLoadingService', () => {
  let service: ScriptLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
