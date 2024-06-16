import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementSummaryComponent } from './statement-summary.component';

describe('StatementSummaryComponent', () => {
  let component: StatementSummaryComponent;
  let fixture: ComponentFixture<StatementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
