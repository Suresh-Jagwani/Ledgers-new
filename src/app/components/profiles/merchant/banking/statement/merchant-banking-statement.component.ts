import { Component, OnInit } from '@angular/core';
import { MerchantBankingTransactionsComponent } from '../transactions/merchant-banking-transactions.component';
import { ActivatedRoute, Params } from '@angular/router';
import { BankingService } from '../../../../../services/banking.service';
import { StatementModel, TransactionModel } from '../../../../../models/statement.model';
import { MaterialModule } from '../../../../../modules/material.module';
import { Subscription, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-merchant-banking-statement',
  standalone: true,
  imports: [MaterialModule, MerchantBankingTransactionsComponent],
  templateUrl: './merchant-banking-statement.component.html',
  styleUrl: './merchant-banking-statement.component.scss'
})
export class MerchantBankingStatementComponent implements OnInit {

  private subscriptions = new Subscription();
  public statement_id: string;
  public transactions: TransactionModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private bankingService: BankingService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.pipe(
        // Extract the statement_id from the route parameters
        switchMap((params: Params) => {
          this.statement_id = params['statement_id'];
          // Return the observable of statements only if the statement_id is defined
          if (this.statement_id) {
            return this.bankingService.statements$;
          } else {
            // If no statement_id, return an observable of an empty array
            return of([]);
          }
        })
      ).subscribe(
        (statements: StatementModel[]) => {
          // Find the statement with the matching ID
          const statement = statements.find(s => s.id === this.statement_id);
          // Update the transactions if the statement is found
          this.transactions = statement ? statement.transactions : [];
        }
      )
    );
  }

}
