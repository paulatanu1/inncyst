import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationNavComponent } from './registration-nav.component';

describe('RegistrationNavComponent', () => {
  let component: RegistrationNavComponent;
  let fixture: ComponentFixture<RegistrationNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
