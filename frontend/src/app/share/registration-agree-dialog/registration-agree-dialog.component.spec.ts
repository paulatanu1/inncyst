import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAgreeDialogComponent } from './registration-agree-dialog.component';

describe('RegistrationAgreeDialogComponent', () => {
  let component: RegistrationAgreeDialogComponent;
  let fixture: ComponentFixture<RegistrationAgreeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationAgreeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationAgreeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
