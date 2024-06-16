import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToggleSidebarService } from '../../services/toggle-sidebar.service';
import { MaterialModule } from '../../modules/material.module';
import { DatabaseService } from '../../services/database.service';
import { MerchantModel } from '../../models/database.model';
import { Observable, Subscription, combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MerchantsComponent } from '../dialogs/merchants/merchants.component';
import { FormatsComponent } from '../dialogs/formats/formats.component';
import { KeysComponent } from '../dialogs/keys/keys.component';
import { DialogMerchantComponent } from '../dialogs/dialog-merchant/dialog-merchant.component';
import { DialogOwnerComponent } from '../dialogs/dialog-owner/dialog-owner.component';
import { DialogFunderComponent } from '../dialogs/dialog-funder/dialog-funder.component';
import { DialogKeyComponent } from '../dialogs/dialog-key/dialog-key.component';
import { DialogSchemeComponent } from '../dialogs/dialog-scheme/dialog-scheme.component';
import { DialogCriteriaComponent } from '../dialogs/dialog-criteria/dialog-criteria.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Output() sidebar = new EventEmitter<void>();

  constructor(private databaseService: DatabaseService, public dialog: MatDialog) { }

  private subscription: Subscription = new Subscription();
  myControl = new FormControl('');
  options: Observable<any[]>;
  data: any[];

  public openForm(component: string) {
    switch (component) {
      case 'merchant':
        this.openDialog(DialogMerchantComponent);
        break;
      case 'owner':
        this.openDialog(DialogOwnerComponent);
        break;
      case 'funder':
        this.openDialog(DialogFunderComponent);
        break;
      case 'scheme':
        this.openDialog(DialogSchemeComponent);
        break;
      case 'key':
        this.openDialog(DialogKeyComponent);
        break;
      case 'criteria':
        this.openDialog(DialogCriteriaComponent);
        break;
    }
  }

  openDialog(component: Type<any>) {
    const dialogRef = this.dialog.open(component);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.options = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(50),
        distinctUntilChanged(),
        map(value => value ? this._filter(value) : []),
        map(options => options.slice(0, 5))
      );
    this.subscription.add(
      combineLatest([
        this.databaseService.funders$,
        this.databaseService.merchants$,
        this.databaseService.owners$
      ]).pipe(
        map(([funders, merchants, owners]) => [...funders, ...merchants, ...owners])
      ).subscribe(data => {
        this.data = data;
      })
    );
  }

  private _filter(value: string): MerchantModel[] {
    const filterValue = value.toLowerCase();
    return this.data.filter(element =>
      (element.ein ? element.ein.toLowerCase().includes(filterValue) : false) ||
      (element.ssn ? element.ssn.toLowerCase().includes(filterValue) : false) ||
      (element.name ? element.name.toLowerCase().includes(filterValue) : false) ||
      (element.email ? element.email.toLowerCase().includes(filterValue) : false) ||
      (element.phone ? element.phone.toLowerCase().includes(filterValue) : false) ||
      (element.address ? element.address.toLowerCase().includes(filterValue) : false)
    );
  }

  public toggleSideBar(): void {
    this.sidebar.emit();
  }
}
