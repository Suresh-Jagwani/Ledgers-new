import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatabaseService } from '../../../../services/database.service';

const COLUMNS = ['address ', 'city', 'state', 'ZIP', 'property type', 'name on title', 'ownership %', 'new constuction', 'property purpose', 'purchase date', 'purchase price', 'construction amount', 'total cost', 'market value', 'lien amount', 'monthly payments', 'monthly escrows', 'monthly rent', 'equity', 'profit/loss', 'DSCR'];

@Component({
  selector: 'app-assets-reo',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './assets-reo.component.html',
  styleUrl: './assets-reo.component.scss'
})
export class AssetsReoComponent {
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
