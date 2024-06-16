import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FunderModel } from '../../../models/database.model';
import { DatabaseService } from '../../../services/database.service';
import { DatabaseTableComponent } from '../table/database-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../../modules/material.module';
import { FormsModule } from '@angular/forms';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

const COLUMNS = ['id', 'name', 'phone', 'email', 'website'];

@Component({
  selector: 'app-database-funders',
  standalone: true,
  imports: [MaterialModule, FormsModule, DatabaseTableComponent, CdkDropList, CdkDrag],
  templateUrl: './database-funders.component.html',
  styleUrl: './database-funders.component.scss'
})
export class DatabaseFundersComponent implements OnInit, AfterViewInit {
  columns = [];
  dataSource: MatTableDataSource<FunderModel>;
  selection = new SelectionModel<FunderModel>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.funders$.subscribe(funders => {
      this.dataSource = new MatTableDataSource(funders);
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
