import { Injectable } from '@angular/core';
import { FinancialsService } from './financials.service';
import { Observable, combineLatest, distinctUntilChanged, filter, map } from 'rxjs';
import { BalanceModel, FinancialsModel } from '../models/financials.model';

@Injectable({
  providedIn: 'root'
})
export class UnderwritingService {

  constructor(private financialsService: FinancialsService) { }

  private get financials(): Observable<FinancialsModel> {
    return this.financialsService.financials$
      .pipe(
        filter(financials => financials !== null && Object.values(financials).every(value => value !== null)),
        distinctUntilChanged(),
      )
  }

  get balances(): Observable<BalanceModel[]> {
    return this.financials.pipe(
      distinctUntilChanged(),
      map(financials => financials.balances)
    );
  }

  public lineChartData(): Observable<any> {
    return this.balances.pipe(
      map(balances => balances.reduce((acc, balance) => {
        acc.dates.push(balance.date.toISOString().split('T')[0]);
        acc.deposits.push(balance.stats.deposits.total);
        acc.revenue.push(balance.stats.deposits.total * 0.45);
        acc.withdrawals.push(balance.stats.withdrawals.total);
        acc.payments.push(balance.stats.payments.total);
        return acc;
      }, { dates: [], deposits: [], revenue: [], withdrawals: [], payments: [] }))
    );
  }

  public pieChartData(): Observable<number[]> {
    return this.balances.pipe(
      map(balances => balances.reduce((total, balance) => {
        total[0] += balance.stats.deposits.total;
        total[1] += balance.stats.withdrawals.total;
        total[2] += balance.stats.deposits.total;
        total[3] += balance.stats.payments.total;
        return total;
      }, [0, 0, 0, 0]))
    );
  }

}
