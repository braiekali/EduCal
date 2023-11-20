import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmDialogComponent } from './reset-password-confirm-dialog.component';

describe('ResetPasswordConfirmDialogComponent', () => {
  let component: ResetPasswordConfirmDialogComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordConfirmDialogComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
