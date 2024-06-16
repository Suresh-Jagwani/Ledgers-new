import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MerchantModel } from '../../../models/database.model';
import { DatabaseService } from '../../../services/database.service';
import { DatabaseTableComponent } from '../table/database-table.component';
import { MaterialModule } from '../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

const COLUMNS = ['name', 'address', 'start_date' , 'industry', 'phone', 'email', 'ein'];

@Component({
  selector: 'app-database-merchants',
  standalone: true,
  imports: [MaterialModule, FormsModule, DatabaseTableComponent, CdkDropList, CdkDrag],
  templateUrl: './database-merchants.component.html',
  styleUrl: './database-merchants.component.scss'
})
export class DatabaseMerchantsComponent implements OnInit, AfterViewInit {

  columns = [];
  dataSource: MatTableDataSource<MerchantModel>;
  selection = new SelectionModel<MerchantModel>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.merchants$.subscribe(merchants => {
      this.dataSource = new MatTableDataSource(merchants);
      this.columns = ['select', ...COLUMNS];
      this.dataSource.sort = this.sort;
    });
    this.selection.changed.subscribe(() => this.databaseService.updateSelectedItems(this.selection.selected));
  }

  toggleAllRows(): void {
    this.selection.selected.length === this.dataSource.data.length ? this.selection.clear() : this.selection.select(...this.dataSource.data);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
