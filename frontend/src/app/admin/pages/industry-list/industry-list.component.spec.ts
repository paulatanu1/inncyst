import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryListComponent } from './industry-list.component';

describe('IndustryListComponent', () => {
  let component: IndustryListComponent;
  let fixture: ComponentFixture<IndustryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
