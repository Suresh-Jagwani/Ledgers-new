import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatabaseService } from '../../../../services/database.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const COLUMNS = ['address ', 'city', 'state', 'ZIP', 'property type', 'name on title', 'ownership %', 'new constuction', 'purchase date', 'purchase price', 'construction amount', 'total cost', 'current price', 'sale date'];

@Component({
  selector: 'app-assets-sales',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './assets-sales.component.html',
  styleUrl: './assets-sales.component.scss'
})
export class AssetsSalesComponent {
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
