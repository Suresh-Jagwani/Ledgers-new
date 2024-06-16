import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../../modules/material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { StatementModel } from '../../../../../models/statement.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BankingService } from '../../../../../services/banking.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-merchant-banking-statements',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './merchant-banking-statements.component.html',
  styleUrl: './merchant-banking-statements.component.scss'
})
export class MerchantBankingStatementsComponent implements OnInit {
  
  columns = ['select', 'year', 'month', 'bank', 'account', 'span', 'navigate', 'delete' ];
  selection: SelectionModel<StatementModel>;
  dataSource:  MatTableDataSource<StatementModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private bankingService: BankingService) {}

  ngOnInit(): void {
    this.bankingService.statements$.subscribe(
      (statements) => {
        this.dataSource = new MatTableDataSource(statements);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.selection = new SelectionModel<StatementModel>(true, []);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
}
