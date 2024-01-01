import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtfolioDetailsComponent } from './protfolio-details.component';

describe('ProtfolioDetailsComponent', () => {
  let component: ProtfolioDetailsComponent;
  let fixture: ComponentFixture<ProtfolioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtfolioDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtfolioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
