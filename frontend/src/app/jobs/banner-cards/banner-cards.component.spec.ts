import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCardsComponent } from './banner-cards.component';

describe('BannerCardsComponent', () => {
  let component: BannerCardsComponent;
  let fixture: ComponentFixture<BannerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
