import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-statement-line',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './statement-line.component.html',
  styleUrl: './statement-line.component.scss'
})
export class StatementLineComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  public isBrowser: boolean;

  public chartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: <ChartData<'line'>> {
      labels: ['08/05', '08/06', '08/07', '08/09' ,'08/10', '08/12', '08/13', '08/15', '08/17'], // Example labels for the X-axis
      datasets: [
        {
          label: 'Balance', // Label for positive dataset
          data: [25 ,37 ,35, 25, 54, 56, 35, 23, 32], // Example positive data points
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.3)',
          fill: false // No fill for positive values
        }/*,
        {
          label: 'Negative Values', // Label for negative dataset
          data: [0, 0, -12, 0, 0, 0, 0, 0], // Example negative data points
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          fill: 'origin' // Fill area under the line for negative values
        }*/
      ]
    },
    options: <ChartOptions<'line'>> {
      responsive: true,
      maintainAspectRatio: true,
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
}