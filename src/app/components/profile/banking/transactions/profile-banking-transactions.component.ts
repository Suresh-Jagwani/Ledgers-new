import { Component, OnInit, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BalanceModel, StatementModel, TransactionModel } from '../../../../models/financials.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../../../modules/material.module';
import { BankingService } from '../../../../services/banking.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, catchError, combineLatest, distinctUntilChanged, filter, firstValueFrom, map, merge, startWith, switchMap, withLatestFrom } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { BankingConfigModel, FilterModel } from '../../../../models/utils-model';
import { group } from 'console';
import { WrapperTableComponent } from '../../../wrapper-table/wrapper-table.component';

const OPERATIONS = [
  { value: '=', tooltip: 'Equal' },
  { value: '>=', tooltip: 'Larger/Equal' },
  { value: '>', tooltip: 'Larger' },
  { value: '<=', tooltip: 'Smaller/Equal' },
  { value: '<', tooltip: 'Smaller' }
];

const TRANSACTIONS_COLUMNS = ['date', 'section', 'operation', 'amount', 'description', 'span', 'balance'];
const STATEMENTS_COLUMNS = ['date', 'bank', 'Revenue', 'Deposits', 'Withdrawals', 'AVG balance', 'N Balance', 'AVG daily PMT', 'remove'];
const BALANCES_COLUMNS = ['date', 'balance', 'transactions', 'deposits', 'withdrawals', 'payments', 'span'];

@Component({
  selector: 'app-profile-banking-transactions',
  standalone: true,
  imports: [MaterialModule, forwardRef(() => WrapperTableComponent)],
  templateUrl: './profile-banking-transactions.component.html',
  styleUrl: './profile-banking-transactions.component.scss'
})
export class ProfileBankingTransactionsComponent implements OnInit {

  columns = ['date', 'account', 'bank', 'beginning_balance', 'span'];

  sortOptions = ['date', 'section', 'description', 'amount', 'balance'];
  groupOptions = ['statements', 'balances', 'transactions', 'sections', 'accounts', 'positions'];
  filterColumns = ['date', 'section', 'description', 'amount', 'balance', 'key'];
  filterOperations = OPERATIONS;

  dataSource: MatTableDataSource<TransactionModel | StatementModel | BalanceModel> = new MatTableDataSource([]);
  config: Observable<BankingConfigModel>;

  resultsLength = 0;
  form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bankingService: BankingService) { }

  ngOnInit(): void {


    this.config = this.bankingService.config;
    (async () => {
      const config = await firstValueFrom(this.bankingService.config);
      this.form = new FormGroup({
        group: new FormControl(config.group),
        sort: new FormControl(config.sort),
        order: new FormControl(config.order),
        filterBy: new FormControl(null),
        filters: new FormControl(config.filters),
        startDate: new FormControl(null),
        endDate: new FormControl(null),
        operation: new FormControl('='),
        filter: new FormControl(null),
        section: new FormControl(null)
      });
      this.form.valueChanges.subscribe(() => this.fieldChange());
    })();
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => this.dataStream(this.paginator.pageIndex, this.paginator.pageSize, this.form ? this.form.get('group').value : 'statements')),
        filter(data => data !== null),
      )
      .subscribe((data: { data: TransactionModel[] | StatementModel[] | BalanceModel[], count: number }) => {
        this.resultsLength = data.count;
       
        if (this.form) {
          switch (this.form.get('group').value) {
            case 'statements':
              this.columns = STATEMENTS_COLUMNS;
              break;
            case 'balances':
              this.columns = BALANCES_COLUMNS;
              break;
            case 'transactions':
              this.columns = TRANSACTIONS_COLUMNS;
              break;
            default:
              this.columns = [];
          }
        }
        else {
          this.columns = STATEMENTS_COLUMNS;
        }
        this.dataSource.data = data.data;
      });
  }

  public dataStream(page: number, pageItems: number, group: string): Observable<{ count: number, data: TransactionModel[] | StatementModel[] | BalanceModel[]}> {
    return this.bankingService.dataStream(
      group,
      this.form ? [
        ...this.form.get('filters').value,
        ...this.currentFilter()
      ] : []
    ).pipe(
      distinctUntilChanged(),
      map(data => ({
        count: data.length,
        data: data.slice(page * pageItems, (page + 1) * (pageItems > data.length ? data.length : pageItems))
      }))
    )
  }

  public fieldChange() {
    this.bankingService.config = {
      group: this.form.get('group').value,
      sort: this.form.get('sort').value,
      order: this.form.get('order').value,
      filters: this.form.get('filters').value
    };
    this.sort.active = this.form.get('sort').value;
    this.sort.direction = this.form.get('order').value ? 'asc' : 'desc';
    this.sort.sortChange.emit({ active: this.sort.active, direction: this.sort.direction });
    this.dataSource.sortData(this.dataSource.data, this.sort);
  }

  private currentFilter(): FilterModel[] {
    const filterBy = this.form.get('filterBy').value;
    const type = ['amount', 'balance'].includes(filterBy) ? 'number' : filterBy === 'date' ? 'date' : 'text';
    const filter = {
      type: type,
      column: filterBy === 'section' && ['deposit', 'withdrawal'].includes(this.form.get('section').value) ? 'operation' : this.form.get('filterBy').value,
      active: true,
      operation: type === 'number' ? this.form.get('operation').value : type === 'date' ? '>=' : null,
      filter: type === 'date' ? this.form.get('startDate').value : (filterBy === 'section' ? this.form.get('section').value : this.form.get('filter').value)
    }
    return type === 'date' ? [filter, {
      type: type,
      column: this.form.get('filterBy').value,
      active: true,
      operation: '<=',
      filter: this.form.get('endDate').value
    }] : [filter];
  }

}