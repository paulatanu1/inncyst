import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManageComponent } from './client-manage.component';

describe('ClientManageComponent', () => {
  let component: ClientManageComponent;
  let fixture: ComponentFixture<ClientManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
