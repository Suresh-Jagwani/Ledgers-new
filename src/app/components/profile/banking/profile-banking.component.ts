import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { BehaviorSubject, Observable, Subscription, combineLatest, filter, first, firstValueFrom, map, withLatestFrom } from 'rxjs';
import { BankingService } from '../../../services/banking.service';
import { MatChip, MatChipEvent, MatChipListboxChange, MatChipOption, MatChipSelectionChange } from '@angular/material/chips';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileBankingFormComponent } from './form/profile-banking-form.component';
import { BalanceModel, StatementModel, TransactionModel, statisticsModel } from '../../../models/financials.model';
import { ProfileService } from '../../../services/profile.service';
import { MatChipListbox } from '@angular/material/chips';

@Component({
  selector: 'app-profile-banking',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, ProfileBankingFormComponent],
  templateUrl: './profile-banking.component.html',
  styleUrl: './profile-banking.component.scss'
})
export class ProfileBankingComponent implements OnInit {

  public active: StatementModel[] = [];
  public isAllSelected: boolean = true;
  @ViewChild('all') all: MatChipOption;

  constructor(private bankingService: BankingService) {}

  ngOnInit(): void {
    this.bankingService.activeStatements.subscribe(statements => this.active = statements);
    this.bankingService.isAllSelected.subscribe(selected => selected ? this.all.select() : this.all.deselect());
  }

  public get statements(): Observable<StatementModel[]> {
    return this.bankingService.statements;
  }

  public async activate(event: MatChipListboxChange): Promise<void> {
    this.bankingService.activeStatements = event.value;
    event.value.length === event.source._chips.length ? this.all.select() : this.all.deselect();
    //JSON.stringify(this.activeStatements) === JSON.stringify(await firstValueFrom(this.statements)) ? all.select() : all.deselect();
  }

  public async activateAll(event: MatChipListboxChange): Promise<void> {
    this.bankingService.activeStatements = event.source.selected ? await firstValueFrom(this.statements) : [];
  }

  public isSelected(statement: StatementModel): boolean {
    return this.active.includes(statement);
  }

  public selectAll(event: MatChipSelectionChange): void {
    this.bankingService.isAllSelected = event.selected;
  }

}

/*this.subscription.add(
      this.bankingService.statements$.pipe(
        withLatestFrom(
          this.bankingService.view$,
          this.bankingService.years$,
          this.bankingService.accounts$,
          this.bankingService.banks$,
          this.bankingService.startDate$,
          this.bankingService.endDate$
        )
    ).subscribe(
      ([statements, view, years, accounts, banks, startDate, endDate]) => {
        if (statements) {
          const viewDate = new Date();
          if (view) {
            viewDate.setMonth(viewDate.getMonth() - view);
          }
          else {
            viewDate.setFullYear(viewDate.getFullYear() - viewDate.getFullYear());
          }
          this.statements = statements.filter(statement =>
            (!years.length || years.includes(statement.date.getFullYear())) &&
            (!accounts.length || accounts.includes(statement.account)) &&
            (!banks.length || banks.includes(statement.bank)) &&
            (startDate ? startDate <= statement.date : true) &&
            (endDate ? endDate >= statement.date : true) &&
            (viewDate ? statement.date >= viewDate: true)
          )
        }
      }
    ));
    this.subscription.add(this.bankingService.statements$
      .pipe(filter(statements => statements !== null))
      .subscribe(statements => this.statements = statements));*/