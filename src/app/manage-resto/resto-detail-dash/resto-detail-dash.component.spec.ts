import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoDetailDashComponent } from './resto-detail-dash.component';

describe('RestoDetailDashComponent', () => {
  let component: RestoDetailDashComponent;
  let fixture: ComponentFixture<RestoDetailDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoDetailDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoDetailDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
