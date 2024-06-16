import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { ParameterModel } from '../../../../models/parser.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { DatabaseService } from '../../../../services/database.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { FunderService } from '../../../../services/funder.service';
import { FormsModule } from '@angular/forms';

const COLUMNS = ['id', 'bank' ,'name', 'value_1'];

@Component({
  selector: 'app-keys-table',
  standalone: true,
  imports: [MaterialModule, FormsModule, CdkDropList, CdkDrag],
  templateUrl: './keys-table.component.html',
  styleUrl: './keys-table.component.scss'
})
export class KeysTableComponent implements OnInit {
  columns = [];
  dataSource: MatTableDataSource<ParameterModel>;
  selection = new SelectionModel<ParameterModel>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private funderService: FunderService) { }

  ngOnInit(): void {
    this.funderService.keys.subscribe(keys => {
      this.dataSource = new MatTableDataSource(keys);
      this.columns = ['select', ...COLUMNS];
      this.dataSource.sort = this.sort;
    });
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
}