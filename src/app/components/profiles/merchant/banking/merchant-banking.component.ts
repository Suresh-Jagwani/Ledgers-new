import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FinancialsService } from '../../../../services/financials.service';
import { BehaviorSubject, Subscription, timeout } from 'rxjs';
import { BalanceModel, StatementModel, TransactionModel } from '../../../../models/statement.model';
import { MatAccordion } from '@angular/material/expansion';
import { MaterialModule } from '../../../../modules/material.module';
import { MerchantBankingTransactionsComponent } from './transactions/merchant-banking-transactions.component';
import { MerchantBankingBalancesComponent } from './balances/merchant-banking-balances.component';
import { MerchantBankingFormComponent } from './form/merchant-banking-form.component';
import { MerchantBankingStatsComponent } from './stats/merchant-banking-stats.component';
import { isPlatformBrowser } from '@angular/common';
import { MerhcantBankingSummaryComponent } from './merhcant-banking-summary/merhcant-banking-summary.component';
import { StatementSummaryComponent } from '../../../parser_old/statement/summary/statement-summary.component';
import { MatDrawer } from '@angular/material/sidenav';
import { MerhcantBankingChartComponent } from './chart/merhcant-banking-chart.component';
import { MerchantBankingOverviewComponent } from './overview/merchant-banking-overview.component';
import { MerchantBankingStatementsComponent } from './merchant-banking-statements/merchant-banking-statements.component';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
import { MatChipListboxChange } from '@angular/material/chips';
import { BankingService } from '../../../../services/banking.service';

@Component({
  selector: 'app-merchant-banking',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MerchantBankingTransactionsComponent,
    MerchantBankingBalancesComponent,
    MerchantBankingFormComponent,
    MerchantBankingStatsComponent,
    MerhcantBankingSummaryComponent,
    MerhcantBankingChartComponent,
    MerchantBankingOverviewComponent,
    MerchantBankingStatementsComponent
  ],
  templateUrl: './merchant-banking.component.html',
  styleUrl: './merchant-banking.component.scss'
})
export class MerchantBankingComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  private activeMonthsSubject = new BehaviorSubject<Date[]>([]);
  public activeMonths$ = this.activeMonthsSubject.asObservable();
  public options: Date[] = [];
  @ViewChild(MerchantBankingOverviewComponent) charts: MerchantBankingOverviewComponent;

  constructor(
    private bankingService: BankingService
    ) {}

  public refreshCharts(): void {
    this.charts?.refreshCharts();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.bankingService.getToolbarOptions().subscribe(
        (options) => {
          this.options = options;
          
          this.updateActiveMonths(this.options);
        }
      )
    )
  }

  public updateActiveMonths(months: Date[]): void {
    this.bankingService.updateActiveMonths(months);
  }

  onChipListChange(event: MatChipListboxChange) {
    this.updateActiveMonths(event.value);
  }
}
