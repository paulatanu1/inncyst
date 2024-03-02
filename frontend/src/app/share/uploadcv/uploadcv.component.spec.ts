import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcvComponent } from './uploadcv.component';

describe('UploadcvComponent', () => {
  let component: UploadcvComponent;
  let fixture: ComponentFixture<UploadcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadcvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
