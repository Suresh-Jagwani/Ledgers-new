import { Component, Inject, Input, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BalanceModel, StatementModel, TransactionModel, statisticsModel } from '../../../../../models/statement.model';
import { isPlatformBrowser } from '@angular/common';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BankingService } from '../../../../../services/banking.service';

@Component({
  selector: 'app-merchant-banking-stats',
  standalone: true,
  imports: [MaterialModule, NgChartsModule],
  templateUrl: './merchant-banking-stats.component.html',
  styleUrl: './merchant-banking-stats.component.scss'
})
export class MerchantBankingStatsComponent implements OnInit {

  @Input() displayedColumns = ['subject', 'deposits', 'withdrawals', 'payments', 'balances'];
  dataSource: MatTableDataSource<statisticsModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bankingService: BankingService) { }


  ngOnInit(): void {
    this.bankingService.getStatistics().subscribe(
      statistics => {
        this.dataSource = new MatTableDataSource(statistics);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
}
