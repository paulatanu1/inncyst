import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTabComponent } from './registration-tab.component';

describe('RegistrationTabComponent', () => {
  let component: RegistrationTabComponent;
  let fixture: ComponentFixture<RegistrationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
