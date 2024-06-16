import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { monthlyModel } from '../../../../models/financials.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatabaseService } from '../../../../services/database.service';

const COLUMNS = ['month'];

@Component({
  selector: 'app-monthly',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './monthly.component.html',
  styleUrl: './monthly.component.scss'
})
export class MonthlyComponent {
  columns = COLUMNS;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.funders$.subscribe(funders => {
      this.dataSource = new MatTableDataSource(funders);
      this.columns = [...COLUMNS];
      this.dataSource.sort = this.sort;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
