import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContentComponent } from './client-content.component';

describe('ClientContentComponent', () => {
  let component: ClientContentComponent;
  let fixture: ComponentFixture<ClientContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
