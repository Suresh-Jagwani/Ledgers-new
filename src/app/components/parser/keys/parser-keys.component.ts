import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { ParameterModel } from '../../../models/parser.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParserService } from '../../../services/parser.service';

@Component({
  selector: 'app-parser-keys',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './parser-keys.component.html',
  styleUrl: './parser-keys.component.scss'
})
export class ParserKeysComponent implements OnInit {
  columns: string[] = ['id', 'kind', 'name', 'bank', 'value_1', 'span'];
  data = [];
  displayedColumns: string[] = []
  dataSource:  MatTableDataSource<ParameterModel>;
  selection = new SelectionModel<ParameterModel>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.parserService.keys$.subscribe(keys => {
      this.displayedColumns = ['select', ...this.columns]
      this.dataSource = new MatTableDataSource(keys);
      this.dataSource.sort = this.sort;
    })
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
