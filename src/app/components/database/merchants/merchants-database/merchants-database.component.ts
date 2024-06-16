import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../../services/database.service';
import { MerchantModel } from '../../../../models/database.model';
import { MaterialModule } from '../../../../modules/material.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-merchants-database',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './merchants-database.component.html',
  styleUrl: './merchants-database.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MerchantsDatabaseComponent {
  
  constructor(private database: DatabaseService) {}
  private subscription: Subscription = new Subscription();

  columns = ['ein', 'name', 'address', 'primary_phone','email'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  columnsToDisplayWithExpand = [];
  expandedElement: MerchantModel | null;

  ngOnInit(): void {
    this.subscription.add(
      this.database.merchants$.subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      })
    );
    if(this.columns) {
      this.displayedColumns = this.columns.map(c => c.toLowerCase());
      this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}