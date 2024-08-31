import { TestBed } from '@angular/core/testing';

import { StateWiseCityService } from './state-wise-city.service';

describe('StateWiseCityService', () => {
  let service: StateWiseCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateWiseCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
