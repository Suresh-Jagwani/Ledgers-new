import { Component, Input } from '@angular/core';
import { StatementModel } from '../../../../../models/financials.model';

@Component({
  selector: 'app-profile-banking-stats-statement',
  standalone: true,
  imports: [],
  templateUrl: './profile-banking-stats-statement.component.html',
  styleUrl: './profile-banking-stats-statement.component.scss'
})
export class ProfileBankingStatsStatementComponent {

  @Input() statement: StatementModel
  
}
