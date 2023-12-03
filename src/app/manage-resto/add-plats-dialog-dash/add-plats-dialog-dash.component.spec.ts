import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlatsDialogDashComponent } from './add-plats-dialog-dash.component';

describe('AddPlatsDialogDashComponent', () => {
  let component: AddPlatsDialogDashComponent;
  let fixture: ComponentFixture<AddPlatsDialogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlatsDialogDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlatsDialogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
