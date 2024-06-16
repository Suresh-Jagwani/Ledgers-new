import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BalanceModel, StatementModel, SummaryModel } from '../../../../../models/statement.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../../../../modules/material.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MerchantBankingTransactionsComponent } from '../transactions/merchant-banking-transactions.component';

@Component({
  selector: 'app-merchant-banking-balances',
  standalone: true,
  imports: [MaterialModule, MerchantBankingTransactionsComponent],
  templateUrl: './merchant-banking-balances.component.html',
  styleUrl: './merchant-banking-balances.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MerchantBankingBalancesComponent implements OnChanges, AfterViewInit {

  @Input() transactionsColumns = ['date', 'count', 'balance', 'deposits', 'withdrawals', 'revenue', 'payments' ];
  balancesColumns = ['date', 'count', 'balance', 'deposits', 'withdrawals', 'revenue', 'payments' ];
  selection: SelectionModel<BalanceModel>;
  dataSource:  MatTableDataSource<BalanceModel>;
  expandedElement: SummaryModel | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() balances: BalanceModel[];
  
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['balances']) {
      this.dataSource = new MatTableDataSource(this.balances);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<BalanceModel>(true, []);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
