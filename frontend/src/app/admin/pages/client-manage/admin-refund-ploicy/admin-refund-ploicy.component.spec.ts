import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRefundPloicyComponent } from './admin-refund-ploicy.component';

describe('AdminRefundPloicyComponent', () => {
  let component: AdminRefundPloicyComponent;
  let fixture: ComponentFixture<AdminRefundPloicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRefundPloicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRefundPloicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
