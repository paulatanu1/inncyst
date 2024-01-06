import { TestBed } from '@angular/core/testing';

import { QuestionStepGuard } from './question-step.guard';

describe('QuestionStepGuard', () => {
  let guard: QuestionStepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuestionStepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
