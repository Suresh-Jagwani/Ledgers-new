import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { ProfileBankingCalculatorComponent } from '../banking/calculator/profile-banking-calculator.component';
import { ProfileBankingChartComponent } from '../banking/chart/profile-banking-chart.component';
import { UnderwritingChartComponent } from './underwriting-chart/underwriting-chart.component';
import { UnderwritingFundersComponent } from './underwriting-funders/underwriting-funders.component';
import { DatabaseFundersComponent } from '../../database/database-funders/database-funders.component';
import { UnderwritingProposedComponent } from './underwriting-proposed/underwriting-proposed.component';
import { UnderwritingSuggestedComponent } from './underwriting-suggested/underwriting-suggested.component';
import { UnderwritingStatsComponent } from './underwriting-stats/underwriting-stats.component';

@Component({
  selector: 'app-underwriting',
  standalone: true,
  imports: [
    MaterialModule,
    ProfileBankingCalculatorComponent,
    ProfileBankingChartComponent,
    UnderwritingChartComponent,
    UnderwritingFundersComponent,
    DatabaseFundersComponent,
    UnderwritingProposedComponent,
    UnderwritingSuggestedComponent,
    UnderwritingStatsComponent
  ],
  templateUrl: './underwriting.component.html',
  styleUrl: './underwriting.component.scss'
})
export class UnderwritingComponent {

}
