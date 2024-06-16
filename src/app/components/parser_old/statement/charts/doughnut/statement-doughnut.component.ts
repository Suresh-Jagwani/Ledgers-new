import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-statement-doughnut',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './statement-doughnut.component.html',
  styleUrl: './statement-doughnut.component.scss'
})
export class StatementDoughnutComponent {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  public isBrowser: boolean;

  public chartConfig: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: <ChartData<'pie'>> {
      labels: [ 'Othe Deposits', 'Revenue','Payments', 'Other Withdrawals'], // Labels for each doughnut segment
      datasets: [{
        label: 'Withdrawals', // Label for the dataset (optional)
        data: [120, 35, 25, 95], // Data points for each segment
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
      aspectRatio: 0.75,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
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
}
