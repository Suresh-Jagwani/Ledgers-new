import { DataSource } from '@angular/cdk/collections';
import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnChanges, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable } from '@angular/material/table';
import { MaterialModule } from '../../modules/material.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProfileService } from '../../services/profile.service';
import { ProfileBankingStatsStatementComponent } from '../profile/banking/stats/statement/profile-banking-stats-statement.component';
import { StatementModel } from '../../models/financials.model';

@Component({
  selector: 'app-wrapper-table',
  standalone: true,
  imports: [MaterialModule, ProfileBankingStatsStatementComponent],
  templateUrl: './wrapper-table.component.html',
  styleUrl: './wrapper-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WrapperTableComponent<T> implements AfterContentInit, OnChanges {

  expandedElement: any;

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  @Input() columns: string[] = [];
  @Input() group: string;

  @Input() dataSource: DataSource<T>;

  constructor(private profileService: ProfileService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['dataSource']) && this.dataSource && this.columns) {
      this.initTable();
    }
  }

  ngAfterContentInit() {
    this.initTable();
  }

  private initTable(): void {
    if (this.columnDefs && this.rowDefs && this.headerRowDefs && this.table) {
      this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
      this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
      this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
      this.table.setNoDataRow(this.noDataRow);
    }
  }

  public removeStatement(id: string): void {
    this.profileService.delete('statement', [id])
  }

  public statementData(statement: StatementModel, column: string) {
    switch (column.toLowerCase()) {
      case 'revenue':
      case 'deposits':
        return statement.stats.deposits.total;
      case 'withdrawals':
        return statement.stats.withdrawals.total;
      case 'avg daily pmt':
        return statement.stats.payments.avg;
      default:
        return statement[column];
    }
  }
}
