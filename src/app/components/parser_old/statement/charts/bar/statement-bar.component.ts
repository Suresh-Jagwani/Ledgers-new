import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-statement-bar',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './statement-bar.component.html',
  styleUrl: './statement-bar.component.scss'
})
export class StatementBarComponent {
  public chartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: <ChartData<'bar'>> {
      labels: ['Deposits', 'Withdrawals', 'Revenue', 'Payments', 'Balance'], // Labels for each bar
      datasets: [{
        label: 'MIN', // Label for the dataset
        data: [92, 35, 25, 52, 23], // Data points for each bar
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
        data: [130, 65, 34, 70, 54], // Data points for each bar
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
        data: [150, 79, 56, 134, 62], // Data points for each bar
        backgroundColor: [ // Colors for each bar
          'rgba(91, 209, 215, 1.0)'
        ],
        borderColor: [ // Border colors for each bar
          'rgba(91, 209, 215, 1.0)'
        ],
        borderWidth: 1
      }]
    },
    options: <ChartOptions<'bar'>> {
      responsive: true,
      maintainAspectRatio: true,
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
  public isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
