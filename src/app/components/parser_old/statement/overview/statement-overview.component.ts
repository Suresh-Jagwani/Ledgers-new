import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';

@Component({
  selector: 'app-statement-overview',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './statement-overview.component.html',
  styleUrl: './statement-overview.component.scss'
})
export class StatementOverviewComponent {
  displayedColumns: string[] = ['subjects', 'deposits', 'withdrawals', 'revenues', 'payments', 'balance'];
  dataSource = ELEMENT_DATA;
  footerSource = FOOTER_DATA;

  isNumber(value: any): boolean {
    return typeof value === 'number';
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
  {subjects: 'COUNT', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: 'MIN', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: 'MAX', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: 'AVG', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14},
  {subjects: 'VOL', deposits: 5000.68, withdrawals: 10000.25, revenues: 500.87, payments: 950.14, balance: 950.14}
];

const FOOTER_DATA: PeriodicElement =
  {subjects: 'TOTAL', deposits: 2521.68, withdrawals: 23423.25, revenues: 345.87, payments: 34532.14, balance: 0};
