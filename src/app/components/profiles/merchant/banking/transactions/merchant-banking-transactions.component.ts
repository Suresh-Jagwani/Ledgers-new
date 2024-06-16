import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../../../../modules/material.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TransactionModel } from '../../../../../models/financials.model';

@Component({
  selector: 'app-merchant-banking-transactions',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './merchant-banking-transactions.component.html',
  styleUrl: './merchant-banking-transactions.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MerchantBankingTransactionsComponent implements OnChanges, AfterViewInit {
  
  @Input() displayedColumns = ['year', 'month', 'day', 'deposit', 'amount', 'type', 'description' ];
  dataSource:  MatTableDataSource<TransactionModel>;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: TransactionModel | null;
  @Input() transactions: TransactionModel[];
  @Input() filter: string = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.dataSource = new MatTableDataSource(this.transactions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    }
    if(changes['filter']) {
      this.dataSource.filter = this.filter.trim().toLowerCase();
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
