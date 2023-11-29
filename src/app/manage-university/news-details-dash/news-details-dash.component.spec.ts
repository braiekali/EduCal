import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailsDashComponent } from './news-details-dash.component';

describe('NewsDetailsDashComponent', () => {
  let component: NewsDetailsDashComponent;
  let fixture: ComponentFixture<NewsDetailsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsDetailsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsDetailsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
