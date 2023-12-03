import { ComponentFixture, TestBed } from '@angular/core/testing';

import AddBlocDialogDashComponent from './add-bloc-dialog-dash.component';

describe('AddBlocDialogDashComponent', () => {
  let component: AddBlocDialogDashComponent;
  let fixture: ComponentFixture<AddBlocDialogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlocDialogDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlocDialogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
