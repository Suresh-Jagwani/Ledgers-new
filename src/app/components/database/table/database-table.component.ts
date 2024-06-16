import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { FunderModel, MerchantModel, OwnerModel } from '../../../models/database.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-database-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './database-table.component.html',
  styleUrl: './database-table.component.scss'
})
export class DatabaseTableComponent implements OnChanges {
  
  @Input() columns: string[] = [];
  @Input() data = [];
  displayedColumns: string[] = []
  dataSource:  MatTableDataSource<MerchantModel | OwnerModel | FunderModel>;
  selection = new SelectionModel<MerchantModel | OwnerModel | FunderModel>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'] || changes['data']) {
      this.displayedColumns = ['select', ...this.columns]
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
    }
  }

  toggleAllRows(): void {
    this.selection.selected.length === this.dataSource.data.length ? this.selection.clear() : this.selection.select(...this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
