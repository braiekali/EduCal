import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestoDialogDashComponent } from './add-resto-dialog-dash.component';

describe('AddRestoDialogDashComponent', () => {
  let component: AddRestoDialogDashComponent;
  let fixture: ComponentFixture<AddRestoDialogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestoDialogDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestoDialogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
