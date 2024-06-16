import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { StatementOverviewComponent } from './overview/statement-overview.component';
import { StatementSummaryComponent } from './summary/statement-summary.component';
import { StatementTransactionsComponent } from './transactions/statement-transactions.component';
import { StatementDoughnutComponent } from './charts/doughnut/statement-doughnut.component';
import { StatementBarComponent } from './charts/bar/statement-bar.component';
import { StatementParserService } from '../../../services/statement-parser.service';
import { HttpClientModule } from '@angular/common/http';
import { StatementLineComponent } from './charts/line/statement-line.component';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [
    MaterialModule,
    StatementOverviewComponent,
    StatementSummaryComponent,
    StatementTransactionsComponent,
    StatementDoughnutComponent,
    StatementBarComponent,
    HttpClientModule,
    StatementLineComponent
  ],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.scss'
})
export class StatementComponent {
  pdfBase64: string;
  columns = ['Date', 'Amount', 'Description', 'Type', 'Revenue'];
  transactions_data = [];
  aaa = {};
  constructor(private parser: StatementParserService) {}

  handleFileSelect(event: any): void {
  }

}

