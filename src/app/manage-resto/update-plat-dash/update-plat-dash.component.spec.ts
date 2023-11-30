import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlatDashComponent } from './update-plat-dash.component';

describe('UpdatePlatDashComponent', () => {
  let component: UpdatePlatDashComponent;
  let fixture: ComponentFixture<UpdatePlatDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlatDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlatDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
