import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { BalanceModel } from '../../../../../models/statement.model';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartOptions, registerables } from 'chart.js';
import { MaterialModule } from '../../../../../modules/material.module';

@Component({
  selector: 'app-merhcant-banking-summary',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './merhcant-banking-summary.component.html',
  styleUrl: './merhcant-banking-summary.component.scss'
})
export class MerhcantBankingSummaryComponent implements OnChanges {
  @Input() balances: BalanceModel[] = [];
  public isBrowser: boolean;
  public lineConfig: ChartConfiguration<'line'> = BALANCE_CONFIG;
  public barConfig: ChartConfiguration<'bar'> = BAR_CONFIG;
  public pieConfig: ChartConfiguration<'pie'> = PIE_CONFIG;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(): void {
    this.refreshChart();
  }

  async refreshChart(): Promise<void> {
    if (this.isBrowser) {
      this.isBrowser = false;
      await new Promise<void>(resolve => setTimeout(() => {
        this.isBrowser = true;
        resolve();
      }, 1));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["balances"] && this.balances) {
      this.lineConfig.data = {
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
      this.barConfig.data = {
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
      this.pieConfig.data = {
        labels: ['Deposits', 'Revenue', 'Payments', 'Withdrawals'], // Labels for each doughnut segment
        datasets: [{
          label: 'stats', // Label for the dataset (optional)
          data: [
            this.balances.reduce((acc, obj) => acc + obj.deposits, 0),
            this.balances.reduce((acc, obj) => acc + obj.revenue, 0),
            this.balances.reduce((acc, obj) => acc + obj.payment, 0),
            this.balances.reduce((acc, obj) => acc + obj.withdrawals, 0)
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
      }
    }
  }
}

const BALANCE_CONFIG: ChartConfiguration<'line'> = {
  type: 'line',
  data: <ChartData<'line'>>{},
  options: <ChartOptions<'line'>>{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: false,
        text: ''
      }
    }
  }
};

const BAR_CONFIG: ChartConfiguration<'bar'> = {
  type: 'bar',
  data: <ChartData<'bar'>>{},
  options: <ChartOptions<'bar'>>{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true // Start the y-axis at zero
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: false
      }
    }
  }
};

const PIE_CONFIG: ChartConfiguration<'pie'> = {
  type: 'pie',
  data: <ChartData<'pie'>> {
    labels: ['Deposits', 'Revenue', 'Payments', 'Withdrawals'], // Labels for each doughnut segment
    datasets: [{
      label: 'stats', // Label for the dataset (optional)
      data: [], // Data points for each segment
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
  },
  options: <ChartOptions<'pie'>> {
    responsive: true,
    cutout: '0%', // Adjust the size of the doughnut hole
    maintainAspectRatio: false,
    aspectRatio: 1,
    layout: {
    },
    plugins: {
      legend: {
        display: true,
        position: 'top', // Position of the legend
      },
      title: {
        display: false,
        text: '' // Chart title
      }
    }
  }
};