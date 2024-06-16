import { Injectable } from '@angular/core';
import { BalanceModel, DisplayedStatisticsModel, FinancialsModel, StatementModel, TransactionModel } from '../models/financials.model';
import { BehaviorSubject, Observable, Subscription, combineLatest, distinctUntilChanged, filter, first, map, switchMap, withLatestFrom } from 'rxjs';
import { FinancialsService } from './financials.service';
import { ProfileService } from './profile.service';
import { FilterModel, BankingConfigModel } from '../models/utils-model';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  private statementsSubject = new BehaviorSubject<StatementModel[]>([]);
  private activeStatementsSubject = new BehaviorSubject<StatementModel[]>([]);
  public statements$ = this.statementsSubject.asObservable();
  public activeStatements$ = this.activeStatementsSubject.asObservable();
  private ConfigSubject = new BehaviorSubject<BankingConfigModel>({
    sort: 'date',
    order: true,
    group: 'statements',
    filters: [],
    sections: [],
    isAllSelected: true,
    accounts: [],
    years: [],
    banks: [],
    view: new Date(0)
  });
  public config$ = this.ConfigSubject.asObservable();


  constructor(private financialsService: FinancialsService) {
  }

  public set config(config: any) {
    const tempConfig = this.ConfigSubject.getValue();
    Object.keys(config).forEach(key => { if (key in tempConfig) tempConfig[key] = config[key]; });
    this.ConfigSubject.next(tempConfig);
  }

  public get config(): Observable<BankingConfigModel> {
    return combineLatest([
      this.config$,
      this.financials
    ]).pipe(
      filter(([config]) => config !== null && Object.values(config).every(value => value !== null)),
      distinctUntilChanged(),
      map(([config, financials]) => { config.sections = financials.sections; return config; })
    )
  }

  public get filters(): Observable<FilterModel[]> {
    return this.config.pipe(
      filter(config => config !== null && Object.values(config).every(value => value !== null)),
      distinctUntilChanged((prev, curr) => prev.filters === curr.filters),
      map(config => config.filters)
    );
  }

  private get financials(): Observable<FinancialsModel> {
    return this.financialsService.financials$
      .pipe(
        filter(financials => financials !== null && Object.values(financials).every(value => value !== null)),
        distinctUntilChanged(),
      )
  }

  public get statements(): Observable<StatementModel[]> {
    return combineLatest([
      this.financials,
      this.config
    ]).pipe(
      map(([financials, config]) => sortStatements(filterStatements(financials.statements, config.accounts, config.years, config.banks, config.view)))
    )
  }

  public set activeStatements(statements: StatementModel[]) {
    this.activeStatementsSubject.next(sortStatements(statements));
  }

  public get activeStatements(): Observable<StatementModel[]> {
    return combineLatest([
      this.activeStatements$,
      this.statements
    ]).pipe(
      filter(statements => statements !== null),
      map(([active, statements]) => active.filter(s => statements.includes(s)))
    )
  }

  get transactions(): Observable<TransactionModel[]> {
    return combineLatest([
      this.financials,
      this.activeStatements
    ]).pipe(
      distinctUntilChanged(),
      map(([financials, statements]) => financials.transactions.filter(t => statements.map(s => s.id).includes(t.statement_id)))
    );
  }

  get balances(): Observable<BalanceModel[]> {
    return combineLatest([
      this.financials,
      this.activeStatements
    ]).pipe(
      distinctUntilChanged(),
      map(([financials, statements]) => financials.balances.filter(b => statements.map(s => s.id).includes(b.statement_id)))
    );
  }

  get sections(): Observable<string[]> {
    return this.financials.pipe(
      map(financials => financials.sections)
    )
  }

  public dataStream(group: string, filters: FilterModel[]): Observable<TransactionModel[] | StatementModel[] | BalanceModel[]> {
    return combineLatest([
      this.activeStatements,
      this.transactions,
      this.balances,
      this.config
    ]).pipe(
      distinctUntilChanged(),
      map(([statements, transactions, balances, config]) => {
        switch (group) {
          case 'statements':
            return statements;
          case 'balances':
            return balances;
          case 'transactions':
          default:
            return sortTransactions(this.filterTransactions(transactions, filters), config.sort, config.order);
        }
      })
    );
  }

  getStatistics(): Observable<any> {
    return combineLatest([
      this.activeStatements,
      this.balances,
      this.transactions
    ]).pipe(
      filter(([statements, balances, transactions]) => statements !== null && balances !== null && transactions !== null),
      distinctUntilChanged(),
      map(([statements, balances, transactions]) => {
        return {
          deposits: {

          }
        };
      })
    );
  }

  getDisplayedStats(): Observable<DisplayedStatisticsModel> {
    return combineLatest([
      this.activeStatements,
      this.balances,
      this.transactions
    ]).pipe(
      map(([statements, balances, transactions]) => new DisplayedStatisticsModel(transactions, balances, statements))
    );
  }

  public set isAllSelected(selected: boolean) {
    this.config = { isAllSelected: selected };
  }

  public get isAllSelected(): Observable<boolean> {
    return this.config.pipe(
      distinctUntilChanged((prev, curr) => prev.isAllSelected === curr.isAllSelected),
      map(config => config.isAllSelected)
    );
  }

  set view(view: number) {
    this.config = { view: view ? new Date(new Date().setMonth(new Date().getMonth() - view)) : new Date(0) };
  }

  public get accounts(): Observable<string[]> {
    return combineLatest([
      this.financials,
      this.config
    ]).pipe(
      map(([financials, config]) => Array.from(new Set(filterStatements(financials.statements, null, config.years, config.banks, config.view).map(s => s.account))))
    );
  }

  set accounts(accounts: string[]) {
    this.config = { accounts: accounts ? accounts : [] };
  }

  public get years(): Observable<number[]> {
    return combineLatest([
      this.financials,
      this.config
    ]).pipe(
      map(([financials, config]) => Array.from(new Set(filterStatements(financials.statements, config.accounts, null, config.banks, config.view).map(s => s.date.getFullYear()))))
    );
  }

  set years(years: number[]) {
    this.config = { years: years ? years : [] };
  }

  public get banks(): Observable<string[]> {
    return combineLatest([
      this.financials,
      this.config
    ]).pipe(
      map(([financials, config]) => Array.from(new Set(filterStatements(financials.statements, config.accounts, config.years, null, config.view).map(s => s.bank))))
    );
  }

  set banks(banks: string[]) {
    this.config = { banks: banks ? banks : [] };
  }

  public lineChartData(): Observable<any> {
    return this.balances.pipe(
      map(balances => balances.reduce((acc, balance) => {
        acc.dates.push(balance.date.toISOString().split('T')[0]);
        acc.balances.push(balance.balance);
        return acc;
      }, { dates: [], balances: [] }))
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

  public filterTransactions(transactions: TransactionModel[], filters: FilterModel[]): TransactionModel[] {
    filters.forEach(filter => {
      if (filter && filter.filter && filter.active) {
        transactions = transactions.filter(t => Object.keys(t).some(key => {
          if (filter.column && filter.column !== key) return false;
          switch (filter.type) {
            case 'number':
              return compareNumbers(t[key], filter.filter, filter.operation);
            case 'date':
              return compareDates(t[key], filter.filter, filter.operation);
            case 'string':
            default: return (
              compareNumbers(t[key], filter.filter, filter.operation) ||
              compareStrings(t[key], filter.filter)
            );
          }
        }));
      }
    });
    return transactions;
  }
}






function sortStatements(statements: StatementModel[]): StatementModel[] {
  return statements ? statements.sort((a, b) => a.date.getTime() - b.date.getTime()) : [];
}

function filterStatements(statements: StatementModel[], accounts: string[], years: number[], banks: string[], view: Date): StatementModel[] {
  return statements ? statements.filter(s =>
    (accounts && accounts.length ? accounts.includes(s.account) : true) &&
    (years && years.length ? years.includes(s.date.getFullYear()) : true) &&
    (banks && banks.length ? banks.includes(s.bank) : true) &&
    (view ? s.date >= view : true)
  ) : [];
}

function sortTransactions(transactions: TransactionModel[], sort: string, order: boolean): TransactionModel[] {
  return transactions.sort((a, b) => order ? (a[sort] > b[sort] ? 1 : -1) : (a[sort] < b[sort] ? 1 : -1));
}

function compareStrings(a: any, b: any): boolean {
  return a && b ? a.toString().replace(/\t/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().includes(
    b.toString().replace(/\t/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
  ) : false;
}

function compareNumbers(a: any, b: any, operator: string): boolean {

  if (!isOnlyDigits(a) || !isOnlyDigits(b)) return false;

  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '>': return a > b;
    case '<': return a < b;
    case '<=': return a <= b;
    case '>=': return a >= b;
    case '=':
    default: return a === b;
  }
}

function compareDates(a: any, b: any, operator: string): boolean {
  if (!isValidDate(a) || !isValidDate(b)) return false;

  a = new Date(a);
  b = new Date(b);

  return operator === '>' ? a > b
    : operator === '<' ? a < b
      : operator === '<=' ? a <= b
        : operator === '>=' ? a >= b
          : (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
          );
}

function isValidDate(d: any): boolean {
  if (d instanceof Date) return !isNaN(d.getTime());
  else if (typeof d === 'string') return !isNaN(Date.parse(d));
  return false;
}

function isOnlyDigits(value: any): boolean {
  if (typeof value === 'number') return !isNaN(value) && isFinite(value);
  else if (typeof value === 'string') return /^-?\d+(\.\d+)?$/.test(value);
  return false;
}

function calculateCV(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const mean = numbers.reduce((sum, amount) => sum + amount, 0) / numbers.length;
  const variant = numbers.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) / numbers.length
  return Math.sqrt(variant) / mean;
}

function calculateAVG(numbers: number[]): number {
  return numbers.length !== 0 ? numbers.reduce((sum, amount) => sum + amount, 0) / numbers.length : 0;
}

function calculateMIN(numbers: number[]) {
    return numbers
      .filter(num => num > 0)
      .reduce((min, num) => Math.min(min, num), Infinity) || 0;
}


function latestValueFrom(statements: Observable<StatementModel[]>) {
  throw new Error('Function not implemented.');
}
/*
  public lineChartData(): Observable<any> {
    return this.balances.pipe(
      map(balances => {
        const datesArray: string[] = [];
        const balancesArray: number[] = [];
 
        balances.forEach(balance => {
          datesArray.push(balance.date.toISOString().split('T')[0]);
          balancesArray.push(balance.balance);
        });
 
        return {
          dates: datesArray,
          balances: balancesArray
        };
      })
    );
  }*/

/*

public pieChartData(): Observable<any> {
  return this.balances$.pipe(
    map(balances => ({
      labels: ['Deposits', 'Revenue', 'Payments', 'Withdrawals'], // Labels for each doughnut segment
      datasets: [{
        label: 'stats', // Label for the dataset (optional)
        data: [
          ...balances.reduce((acc, balance) => {
            acc[0] += balance.deposits;
            acc[1] += balance.revenue;
            acc[2] += balance.payment;
            acc[3] += balance.withdrawals;
            return acc;
          }, [0, 0, 0, 0])
        ], // Data points for each segment
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
    }))
  );
}

public getToolbarOptions(): Observable<Date[]> {
  return combineLatest([this.financials$, this.startDate$, this.endDate$]).pipe(
    map(([financials, startDate, endDate]) => {
      if (!financials?.statements) {
        return [];
      }
      return Array.from(new Set(financials.statements
        .map(({ start_date }) => {
          const year = start_date.getFullYear(), month = start_date.getMonth();
          return (!startDate || year > startDate.getFullYear() || (year === startDate.getFullYear() && month >= startDate.getMonth()))
            && (!endDate || year < endDate.getFullYear() || (year === endDate.getFullYear() && month <= endDate.getMonth()))
            ? start_date : null;
        })
        .filter(date => date !== null)
      ));
    })
  );
}


public getStatistics(): Observable<statisticsModel[]> {
  return combineLatest([this.transactions$, this.balances$]).pipe(
    map(([transactions, balances]) => {
      let stats = {
        sums: { deposits: 0, withdrawals: 0, revenue: 0, payments: 0, balances: 0 },
        mins: { deposits: Infinity, withdrawals: Infinity, revenue: Infinity, payments: Infinity, balances: Infinity },
        maxs: { deposits: 0, withdrawals: 0, revenue: 0, payments: 0, balances: 0 },
        counts: { deposits: 0, withdrawals: 0, revenue: 0, payments: 0, balances: 0 },
        amounts: { deposits: [], withdrawals: [], revenue: [], payments: [], balances: [] }
      };

      transactions.forEach(transaction => {
        const amount = transaction.amount;
        const isDeposit = transaction.deposit;
        const isRevenue = transaction.type === "revenue";
        const isPayment = transaction.type === "payment";

        if (amount > 0) {
          if (isDeposit) {
            stats.sums.deposits += amount;
            stats.mins.deposits = Math.min(stats.mins.deposits, amount);
            stats.maxs.deposits = Math.max(stats.maxs.deposits, amount);
            stats.counts.deposits++;
            stats.amounts.deposits.push(amount);

            if (isRevenue) {
              stats.sums.revenue += amount;
              stats.mins.revenue = Math.min(stats.mins.revenue, amount);
              stats.maxs.revenue = Math.max(stats.maxs.revenue, amount);
              stats.counts.revenue++;
              stats.amounts.revenue.push(amount);
            }
          } else {
            stats.sums.withdrawals += amount;
            stats.mins.withdrawals = Math.min(stats.mins.withdrawals, amount);
            stats.maxs.withdrawals = Math.max(stats.maxs.withdrawals, amount);
            stats.counts.withdrawals++;
            stats.amounts.withdrawals.push(amount);

            if (isPayment) {
              stats.sums.payments += amount;
              stats.mins.payments = Math.min(stats.mins.payments, amount);
              stats.maxs.payments = Math.max(stats.maxs.payments, amount);
              stats.counts.payments++;
              stats.amounts.payments.push(amount);
            }
          }
        }
      });

      balances.forEach(balance => {
        stats.sums.balances += balance.balance;
        stats.mins.balances = Math.min(stats.mins.balances, balance.balance);
        stats.maxs.balances = Math.max(stats.maxs.balances, balance.balance);
        stats.counts.balances++;
        stats.amounts.balances.push(balance.balance);
      });

      const calculateAverage = (sum, count) => count > 0 ? sum / count : 0;

      const calculateStandardDeviation = (values: number[]) => {
        const avg = calculateAverage(values.reduce((a, b) => a + b, 0), values.length);
        const squareDiffs = values.map(value => Math.pow(value - avg, 2));
        const avgSquareDiff = calculateAverage(squareDiffs.reduce((a, b) => a + b, 0), squareDiffs.length);
        return Math.sqrt(avgSquareDiff);
      };

      return [
        {
          subject: "Total",
          deposits: stats.sums.deposits,
          withdrawals: stats.sums.withdrawals,
          revenue: stats.sums.revenue,
          payments: stats.sums.payments,
          balances: null
        },
        {
          subject: "MIN",
          deposits: stats.mins.deposits === Infinity ? 0 : stats.mins.deposits,
          withdrawals: stats.mins.withdrawals === Infinity ? 0 : stats.mins.withdrawals,
          revenue: stats.mins.revenue === Infinity ? 0 : stats.mins.revenue,
          payments: stats.mins.payments === Infinity ? 0 : stats.mins.payments,
          balances: stats.mins.balances === Infinity ? 0 : stats.mins.balances
        },
        {
          subject: "MAX",
          deposits: stats.maxs.deposits,
          withdrawals: stats.maxs.withdrawals,
          revenue: stats.maxs.revenue,
          payments: stats.maxs.payments,
          balances: stats.maxs.balances
        },
        {
          subject: "AVG",
          deposits: calculateAverage(stats.sums.deposits, stats.counts.deposits),
          withdrawals: calculateAverage(stats.sums.withdrawals, stats.counts.withdrawals),
          revenue: calculateAverage(stats.sums.revenue, stats.counts.revenue),
          payments: calculateAverage(stats.sums.payments, stats.counts.payments),
          balances: calculateAverage(stats.sums.balances, stats.counts.balances)
        },
        {
          subject: "COUNT",
          deposits: stats.counts.deposits,
          withdrawals: stats.counts.withdrawals,
          revenue: stats.counts.revenue,
          payments: stats.counts.payments,
          balances: stats.counts.balances
        },
        {
          subject: "Volatility",
          deposits: calculateStandardDeviation(stats.amounts.deposits),
          withdrawals: calculateStandardDeviation(stats.amounts.withdrawals),
          revenue: calculateStandardDeviation(stats.amounts.revenue),
          payments: calculateStandardDeviation(stats.amounts.payments),
          balances: calculateStandardDeviation(stats.amounts.balances)
        }
      ];
    })
  );
}

*/
/*
    this.subscriptions.add(combineLatest([this.financials$, this.activeMonths$, this.startDate$, this.endDate$])
      .subscribe(
        ([financials, activeMonths, startDate, endDate]) => {
          if (financials && financials.statements) {
            this.statementsSubject.next(financials.statements.filter(
              (statement) => (
                activeMonths.some(
                  (activeMonth) => (
                    statement.start_date.getFullYear() === activeMonth.getFullYear() &&
                    statement.start_date.getMonth() === activeMonth.getMonth()
                  )
                ) &&
                (!startDate ||
                  (statement.start_date.getFullYear() > startDate.getFullYear() ||
                    (statement.start_date.getFullYear() === startDate.getFullYear() && statement.start_date.getMonth() >= startDate.getMonth()))) &&
                (!endDate ||
                  (statement.start_date.getFullYear() < endDate.getFullYear() ||
                    (statement.start_date.getFullYear() === endDate.getFullYear() && statement.start_date.getMonth() <= endDate.getMonth())))
              )
            ));
          }
        }
      )
    );*/

/*this.subscriptions.add(
 this.financialsService.financials$
   .pipe(
     filter(financials => financials !== null),
     withLatestFrom(
       this.accounts$,
       this.years$,
       this.banks$,
       this.view$
     )
   )
   .subscribe(
     ([financials, accounts, years, banks, view]) => {/*
       const viewDate = new Date();
       if (view)
         viewDate.setMonth(viewDate.getMonth() - view);
       this.statements = financials.statements.filter(statement =>
         (accounts ? accounts.includes(statement.account) : true) &&
         (years ? years.includes(statement.date.getFullYear()) : true) &&
         (banks ? banks.includes(statement.bank) : true) &&
         (view ? statement.date >= viewDate : true)
       );
       }
   )
);
this.subscriptions.add(
 this.activeStatements$
   .pipe(
     filter(statements => statements !== null),
     map(statements => {
       return statements.reduce((acc, statement) => {
         acc.balances.push(...statement.balances);
         return acc;
       }, { balances: [] });
     })
   )
   .subscribe(({ balances }) => {
     this.balancesSubject.next(balances);
   })
);
 
   this.subscriptions.add(
     this.financialsService.financials$
       .pipe(
         filter(financials => financials !== null),
       )
       .subscribe(financials => {
         this.statements = financials.statements;
         if (this.init) {
           this.init = false;
           this.yearsOptSubject.next(Array.from(new Set(this.statements.map(statement => statement.date.getFullYear()))));
           this.accountsOptSubject.next(Array.from(new Set(this.statements.map(statement => statement.account))));
           this.banksOptSubject.next(Array.from(new Set(this.statements.map(statement => statement.bank))));
         }
       })
   );
   this.subscriptions.add(
     this.profileService.client$
       .pipe(
         filter(client => client !== null)
       )
       .subscribe(() => {
         this.init = true;
         this.activeStatements = this.statements;
         this.years = [];
         this.accounts = [];
         this.banks = [];
         this.view = null;
       })
   );
 
   this.subscriptions.add(
     this.activeStatements$
       .pipe(
         filter(statements => statements !== null)
       )
       .subscribe(statements => {
         alert("aaa")
         this.balancesSubject.next(statements.reduce((acc, statement) => { return acc.concat(statement.balances); }, []));
         this.transactionsSubject.next(statements.reduce((acc, statement) => { return acc.concat(statement.transactions); }, []));
       })
   );
 
   this.subscriptions.add(this.accounts$
     .pipe(filter(accounts => accounts !== null))
     .subscribe(accounts => {
       const filtered = this.statements.filter(statement => accounts.length ? accounts.includes(statement.account) : true);
       this.yearsOpt = Array.from(new Set(filtered.map(statement => statement.date.getFullYear())));
       this.banksOpt = Array.from(new Set(filtered.map(statement => statement.bank)));
       this.statements = this.statements.filter(statement => accounts.includes(statement.account));
     })
   );
   this.subscriptions.add(this.years$
     .pipe(filter(years => years !== null))
     .subscribe(years => {
       const filtered = this.statements.filter(statement => years.length ? years.includes(statement.date.getFullYear()) : true);
       this.accountsOpt = Array.from(new Set(filtered.map(statement => statement.account)));
       this.banksOpt = Array.from(new Set(filtered.map(statement => statement.bank)));
       this.statements = this.statements.filter(statement => years.includes(statement.date.getFullYear()));
     })
   );
   this.subscriptions.add(this.banks$
     .pipe(filter(banks => banks !== null))
     .subscribe(banks => {
       const filtered = this.statements.filter(statement => banks.length ? banks.includes(statement.bank) : true);
       this.accountsOpt = Array.from(new Set(filtered.map(statement => statement.account)));
       this.yearsOpt = Array.from(new Set(filtered.map(statement => statement.date.getFullYear())));
       this.statements = this.statements.filter(statement => banks.includes(statement.bank));
     })
   );
   this.subscriptions.add(this.view$
     .pipe(filter(view => view !== null))
     .subscribe(view => {
       const viewDate = new Date();
       if (view) {
         viewDate.setMonth(viewDate.getMonth() - view);
       }
       else {
         viewDate.setFullYear(0);
       }
       const filtered = this.statements.filter(statement => statement.date >= viewDate);
       this.accountsOpt = Array.from(new Set(filtered.map(statement => statement.account)));
       this.yearsOpt = Array.from(new Set(filtered.map(statement => statement.date.getFullYear())));
       this.banksOpt = Array.from(new Set(filtered.map(statement => statement.bank)));
       this.statements = this.statements.slice(0, view);
     })
   );*/