import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwritingChartComponent } from './underwriting-chart.component';

describe('UnderwritingChartComponent', () => {
  let component: UnderwritingChartComponent;
  let fixture: ComponentFixture<UnderwritingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderwritingChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderwritingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
