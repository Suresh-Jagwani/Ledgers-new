import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDoughnutComponent } from './statement-doughnut.component';

describe('StatementDoughnutComponent', () => {
  let component: StatementDoughnutComponent;
  let fixture: ComponentFixture<StatementDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementDoughnutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
