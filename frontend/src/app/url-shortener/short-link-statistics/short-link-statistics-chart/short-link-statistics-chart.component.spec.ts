import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortLinkStatisticsChartComponent } from './short-link-statistics-chart.component';

describe('ShortLinkStatisticsChartComponent', () => {
  let component: ShortLinkStatisticsChartComponent;
  let fixture: ComponentFixture<ShortLinkStatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortLinkStatisticsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortLinkStatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
