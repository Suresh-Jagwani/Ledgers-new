import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOverviewComponent } from './statement-overview.component';

describe('StatementOverviewComponent', () => {
  let component: StatementOverviewComponent;
  let fixture: ComponentFixture<StatementOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
