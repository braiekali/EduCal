import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBlocDashComponent } from './update-bloc-dash.component';

describe('UpdateBlocDashComponent', () => {
  let component: UpdateBlocDashComponent;
  let fixture: ComponentFixture<UpdateBlocDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBlocDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBlocDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
