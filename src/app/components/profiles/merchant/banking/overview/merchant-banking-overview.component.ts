import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../../modules/material.module';
import { MerhcantBankingSummaryComponent } from '../merhcant-banking-summary/merhcant-banking-summary.component';
import { MerhcantBankingChartComponent } from '../chart/merhcant-banking-chart.component';
import { BalanceModel, StatementModel, TransactionModel } from '../../../../../models/statement.model';
import { MerchantBankingBalancesComponent } from '../balances/merchant-banking-balances.component';
import { MerchantBankingStatsComponent } from '../stats/merchant-banking-stats.component';
import { BankingService } from '../../../../../services/banking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-merchant-banking-overview',
  standalone: true,
  imports: [MaterialModule, MerhcantBankingSummaryComponent, MerhcantBankingChartComponent, MerchantBankingBalancesComponent, MerchantBankingStatsComponent],
  templateUrl: './merchant-banking-overview.component.html',
  styleUrl: './merchant-banking-overview.component.scss'
})
export class MerchantBankingOverviewComponent implements OnInit {

  private subscriptions = new Subscription();
  public balances: BalanceModel[] = [];
  public lineConfig: { labels: string[], datasets: any[] };
  public pieConfig: { labels: string[], datasets: any[] };
  public barConfig: { labels: string[], datasets: any[] };
  public transactions: TransactionModel[] = [];
  @ViewChild('chart') charts: MerhcantBankingChartComponent;

  constructor(private bankingService: BankingService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.bankingService.balances$.subscribe(
      (balances) => {
        this.balances = balances;/*
        this.lineConfig = this.chartData("line");
        this.pieConfig = this.chartData("pie");
        this.barConfig = this.chartData("bar");*/
      }
    ));
    this.subscriptions.add(this.bankingService.transactions$.subscribe((transactions) => { this.transactions = transactions; }));
  }

  public refreshCharts(): void {
    this.charts?.refreshChart();
  }
/*
  public chartData(type: string): { labels: string[], datasets: any[] } {
    switch (type) {
      case "pie":
        return {
          labels: ['Deposits', 'Revenue', 'Payments', 'Withdrawals'], // Labels for each doughnut segment
          datasets: [{
            label: 'stats', // Label for the dataset (optional)
            data: [
              ...this.balances.reduce((acc, balance) => {
                acc[0] += balance.deposits;
                acc[1] += balance.revenue;
                acc[2] += balance.payment;
                acc[3] += balance.withdrawals;
                return acc;
              }, [0, 0, 0, 0])
            ], // Data points for each segment
            backgroundColor: [ // Colors for each segment
              'rgba(91, 209, 215, 1.0)',
              'rgba(158, 235, 71, 1.0)',
              'rgba(245, 151, 148, 1.0)',
              'rgba(240, 191, 76, 1.0)'
            ],
            borderColor: [ // Border colors for each segment
              'rgba(91, 209, 215, 1.0)',
              'rgba(158, 235, 71, 1.0)',
              'rgba(245, 151, 148, 1.0)',
              'rgba(240, 191, 76, 1.0)'
            ],
            borderWidth: 1
          }]
        };

      case "bar":
        return {
          labels: ['Deposits', 'Withdrawals', 'Revenue', 'Payments', 'Balance'], // Labels for each bar
          datasets: [{
            label: 'MIN', // Label for the dataset
            data: [
              this.balances.reduce((min, current) => {
                return (current.deposits > 0 && (current.deposits < min || min === 0)) ? current.deposits : min;
              }, 0),
              this.balances.reduce((min, current) => {
                return (current.withdrawals > 0 && (current.withdrawals < min || min === 0)) ? current.withdrawals : min;
              }, 0),
              this.balances.reduce((min, current) => {
                return (current.revenue > 0 && (current.revenue < min || min === 0)) ? current.revenue : min;
              }, 0),
              this.balances.reduce((min, current) => {
                return (current.payment > 0 && (current.payment < min || min === 0)) ? current.payment : min;
              }, 0),
              this.balances.reduce((min, current) => {
                return (current.balance > 0 && (current.balance < min || min === 0)) ? current.balance : min;
              }, 0)
            ], // Data points for each bar
            backgroundColor: [ // Colors for each bar
              'rgba(245, 151, 148, 1.0)'
            ],
            borderColor: [ // Border colors for each bar
              'rgba(245, 151, 148, 1.0)'
            ],
            borderWidth: 1
          },
          {
            label: 'AVG', // Label for the dataset
            data: [
              this.balances.reduce((acc, obj, _, arr) => acc + obj.deposits / arr.length, 0),
              this.balances.reduce((acc, obj, _, arr) => acc + obj.withdrawals / arr.length, 0),
              this.balances.reduce((acc, obj, _, arr) => acc + obj.revenue / arr.length, 0),
              this.balances.reduce((acc, obj, _, arr) => acc + obj.payment / arr.length, 0),
              this.balances.reduce((acc, obj, _, arr) => acc + obj.balance / arr.length, 0),
            ], // Data points for each bar
            backgroundColor: [ // Colors for each bar
              'rgba(240, 191, 76, 1.0)'
            ],
            borderColor: [ // Border colors for each bar
              'rgba(240, 191, 76, 1.0)'
            ],
            borderWidth: 1
          },
          {
            label: 'MAX', // Label for the dataset
            data: [
              this.balances.reduce((max, current) => {
                return (current.deposits > 0 && current.deposits > max) ? current.deposits : max;
              }, 0),
              this.balances.reduce((max, current) => {
                return (current.withdrawals > 0 && current.withdrawals > max) ? current.withdrawals : max;
              }, 0),
              this.balances.reduce((max, current) => {
                return (current.revenue > 0 && current.revenue > max) ? current.revenue : max;
              }, 0),
              this.balances.reduce((max, current) => {
                return (current.payment > 0 && current.payment > max) ? current.payment : max;
              }, 0),
              this.balances.reduce((max, current) => {
                return (current.balance > 0 && current.balance > max) ? current.balance : max;
              }, 0),
            ], // Data points for each bar
            backgroundColor: [ // Colors for each bar
              'rgba(91, 209, 215, 1.0)'
            ],
            borderColor: [ // Border colors for each bar
              'rgba(91, 209, 215, 1.0)'
            ],
            borderWidth: 1
          }]
        };

      default:
        return {
          labels: this.balances.map(balance => balance.date.toISOString().split('T')[0]), // Example labels for the X-axis
          datasets: [
            {
              label: 'Balance', // Label for dataset
              data: this.balances.map(balance => balance.balance), // Data points
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.3)',
              fill: false // No fill for positive values
            }
          ]
        };
    }
  }
*/
}
