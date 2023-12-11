import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservationDashComponent } from './update-reservation-dash.component';

describe('UpdateReservationDashComponent', () => {
  let component: UpdateReservationDashComponent;
  let fixture: ComponentFixture<UpdateReservationDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReservationDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReservationDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
