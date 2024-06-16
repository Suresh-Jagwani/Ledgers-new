import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { OwnerModel } from '../../../models/database.model';
import { DatabaseTableComponent } from '../table/database-table.component';
import { MaterialModule } from '../../../modules/material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

const COLUMNS = ['name', 'address', 'phone', 'email', 'ssn'];

@Component({
  selector: 'app-database-owners',
  standalone: true,
  imports: [MaterialModule, DatabaseTableComponent],
  templateUrl: './database-owners.component.html',
  styleUrl: './database-owners.component.scss'
})
export class DatabaseOwnersComponent implements OnInit, AfterViewInit {

  columns = [];
  dataSource: MatTableDataSource<OwnerModel>;
  selection = new SelectionModel<OwnerModel>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.owners$.subscribe(owners => {
      this.dataSource = new MatTableDataSource(owners);
      this.columns = ['select', ...COLUMNS];
      this.dataSource.sort = this.sort;
    });
    this.selection.changed.subscribe(() => this.databaseService.updateSelectedItems(this.selection.selected));
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
