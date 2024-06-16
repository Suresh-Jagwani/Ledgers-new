import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementTransactionsComponent } from './statement-transactions.component';

describe('StatementTransactionsComponent', () => {
  let component: StatementTransactionsComponent;
  let fixture: ComponentFixture<StatementTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
