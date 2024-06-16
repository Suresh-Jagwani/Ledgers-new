import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { StatementParserService } from '../../../../services/statement-parser.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-statement-summary',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './statement-summary.component.html',
  styleUrl: './statement-summary.component.scss'
})
export class StatementSummaryComponent implements OnInit {

  constructor(private parser: StatementParserService) {}
  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['date', 'deposits', 'withdrawals', 'revenues', 'payments', 'balance'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  ngOnInit(): void {
    this.subscription.add(
      this.parser.summary$.subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

export interface PeriodicElement {
  subjects: string;
  deposits: number;
  withdrawals: number;
  revenues: number;
  payments: number;
  balance: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {subjects: '12/05', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/06', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/07', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/08', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/14', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/15', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/16', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/19', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/20', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/23', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/24', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/25', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: '12/26', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14}
];
