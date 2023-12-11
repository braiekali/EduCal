import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestauComponent } from './update-restau.component';

describe('UpdateRestauComponent', () => {
  let component: UpdateRestauComponent;
  let fixture: ComponentFixture<UpdateRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRestauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
