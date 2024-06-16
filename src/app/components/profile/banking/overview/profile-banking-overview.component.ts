import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { ProfileBankingChartComponent } from '../chart/profile-banking-chart.component';
import { ProfileBankingTransactionsComponent } from '../transactions/profile-banking-transactions.component';
import { ProfileBankingStatsComponent } from '../stats/profile-banking-stats.component';
import { ProfileBankingCalculatorComponent } from '../calculator/profile-banking-calculator.component';
import { MonthlyComponent } from '../monthly/monthly.component';

@Component({
  selector: 'app-profile-banking-overview',
  standalone: true,
  imports: [MaterialModule, ProfileBankingChartComponent, ProfileBankingTransactionsComponent, ProfileBankingStatsComponent, ProfileBankingCalculatorComponent, MonthlyComponent],
  templateUrl: './profile-banking-overview.component.html',
  styleUrl: './profile-banking-overview.component.scss'
})
export class ProfileBankingOverviewComponent {

  @ViewChild('chart') charts: ProfileBankingChartComponent;

  constructor() { }

  public refreshCharts(): void {
    this.charts?.refreshChart();
  }

}
