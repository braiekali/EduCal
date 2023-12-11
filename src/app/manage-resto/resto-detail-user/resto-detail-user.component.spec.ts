import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoDetailUserComponent } from './resto-detail-user.component';

describe('RestoDetailUserComponent', () => {
  let component: RestoDetailUserComponent;
  let fixture: ComponentFixture<RestoDetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoDetailUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
