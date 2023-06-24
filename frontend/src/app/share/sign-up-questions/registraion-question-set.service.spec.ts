import { TestBed } from '@angular/core/testing';

import { RegistraionQuestionSetService } from './registraion-question-set.service';

describe('RegistraionQuestionSetService', () => {
  let service: RegistraionQuestionSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistraionQuestionSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
