import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrivacyPolicyComponent } from './admin-privacy-policy.component';

describe('AdminPrivacyPolicyComponent', () => {
  let component: AdminPrivacyPolicyComponent;
  let fixture: ComponentFixture<AdminPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPrivacyPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
