import { Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { BankingService } from '../../../../services/banking.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile-banking-chart',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './profile-banking-chart.component.html',
  styleUrl: './profile-banking-chart.component.scss'
})
export class ProfileBankingChartComponent implements OnInit {

  @Input() type: string = "line";
  @Input() dataset: any;
  public isBrowser: boolean;
  public lineConfig: ChartConfiguration<'line'> = LINE_CONFIG;
  public barConfig: ChartConfiguration<'bar'> = BAR_CONFIG;
  public pieConfig: ChartConfiguration<'pie'> = PIE_CONFIG;
  @ViewChild('chart') chart: HTMLCanvasElement;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private bankingService: BankingService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(): void {
    this.refreshChart();
  }

  public async refreshChart(): Promise<void> {
    if (this.isBrowser) {
      this.isBrowser = false;
      await new Promise<void>(resolve => setTimeout(() => {
        this.isBrowser = true;
        resolve();
      }, 1));
    }
  }

  ngOnInit(): void {

    switch (this.type) {
      case 'line':
        this.bankingService.lineChartData()
          .pipe(
            filter(({ dates, balances }) => dates && balances)
          )
          .subscribe(
            ({ dates, balances }) => {
              this.lineConfig.data = {
                labels: dates, // Labels for the X-axis
                datasets: [{
                  label: 'Balance', // Label for dataset
                  data: balances, // Data points
                  borderColor: 'rgba(0, 255, 0, 1)',
                  backgroundColor: 'rgba(0, 255, 0, 0.3)',
                  tension: 0.25,
                  fill: false, // No fill for positive values
                }]
              };
            }
          );
        break;
      case 'pie':
        this.bankingService.pieChartData().subscribe(data => {
          this.pieConfig.data = {
            labels: ['Deposits', 'Revenue', 'Payments', 'Withdrawals'], // Labels for each doughnut segment
              datasets: [{
                label: 'stats', // Label for the dataset (optional)
                data: data, // Data points for each segment
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
        })
        break;
      case 'bar':/*
        this.bankingService.pieChartData().subscribe(data => { if (data) { this.barConfig.data = data; this.refreshChart(); } });*/
        break;
    };
  }

}

const LINE_CONFIG: ChartConfiguration<'line'> = {
  type: 'line',
  data: <ChartData<'line'>>{},
  options: <ChartOptions<'line'>>{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
  data: <ChartData<'pie'>>{
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
  options: <ChartOptions<'pie'>>{
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