import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { StatementModel } from '../../../../models/financials.model';
import { MatSort } from '@angular/material/sort';
import { BankingService } from '../../../../services/banking.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-banking-statements',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './profile-banking-statements.component.html',
  styleUrl: './profile-banking-statements.component.scss'
})
export class ProfileBankingStatementsComponent {
  columns = ['select', 'year', 'month', 'bank', 'account', 'span', 'navigate', 'delete'];
  selection: SelectionModel<StatementModel>;
  dataSource: MatTableDataSource<StatementModel>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bankingService: BankingService) { }

  ngOnInit(): void {
    this.bankingService.statements$.subscribe(
      (statements) => {
        this.dataSource = new MatTableDataSource(statements);
        this.dataSource.sort = this.sort;
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
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
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
