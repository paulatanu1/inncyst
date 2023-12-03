import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpQuestionsComponent } from './sign-up-questions.component';

describe('SignUpQuestionsComponent', () => {
  let component: SignUpQuestionsComponent;
  let fixture: ComponentFixture<SignUpQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
