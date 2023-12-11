import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocDetailDashComponent } from './bloc-detail-dash.component';

describe('BlocDetailDashComponent', () => {
  let component: BlocDetailDashComponent;
  let fixture: ComponentFixture<BlocDetailDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocDetailDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocDetailDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
