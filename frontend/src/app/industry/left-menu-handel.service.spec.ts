import { TestBed } from '@angular/core/testing';

import { LeftMenuHandelService } from './left-menu-handel.service';

describe('LeftMenuHandelService', () => {
  let service: LeftMenuHandelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftMenuHandelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
