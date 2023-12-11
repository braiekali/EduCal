import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocListDashComponent } from './bloc-list-dash.component';

describe('BlocListDashComponent', () => {
  let component: BlocListDashComponent;
  let fixture: ComponentFixture<BlocListDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocListDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocListDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
