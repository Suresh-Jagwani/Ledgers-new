import { Component, Input, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StatementParserService } from '../../../../services/statement-parser.service';
import { Subscription } from 'rxjs';
import { TransactionModel } from '../../../../models/statement.model';

@Component({
  selector: 'app-statement-transactions',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './statement-transactions.component.html',
  styleUrl: './statement-transactions.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StatementTransactionsComponent {
  
  constructor(private parser: StatementParserService) {}
  private subscription: Subscription = new Subscription();

  @Input() columns: string[];
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = []
  columnsToDisplayWithExpand = []
  expandedElement: TransactionModel | null;

  ngOnInit(): void {
    this.subscription.add(
      this.parser.transactions$.subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      })
    );
    if(this.columns) {
      this.displayedColumns = this.columns.map(c => c.toLowerCase());
      this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
