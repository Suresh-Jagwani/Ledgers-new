import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { BankingService } from '../../../../services/banking.service';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayedStatisticsModel } from '../../../../models/financials.model';

@Component({
  selector: 'app-profile-banking-stats',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './profile-banking-stats.component.html',
  styleUrl: './profile-banking-stats.component.scss'
})
export class ProfileBankingStatsComponent implements OnInit {

  columns = ['column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7', 'column8', 'column9', 'column10'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([])
  stats: DisplayedStatisticsModel;

  constructor(private bankingService: BankingService) {}

  ngOnInit(): void {
    this.bankingService.getDisplayedStats().subscribe(stats => this.stats = stats);
  }

}
