import { Component, OnInit } from '@angular/core';
import { BankingService } from '../../../../services/banking.service';
import { MaterialModule } from '../../../../modules/material.module';
import { ProfileService } from '../../../../services/profile.service';
import { FormControl } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-banking-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './profile-banking-form.component.html',
  styleUrl: './profile-banking-form.component.scss'
})
export class ProfileBankingFormComponent implements OnInit {

  accountsControl = new FormControl(null);
  banksControl = new FormControl(null);
  yearsControl = new FormControl(null);
  viewControl = new FormControl(null);
  startDateControl = new FormControl(null);
  endDateControl = new FormControl(null);

  constructor(private profileService: ProfileService, private bankingService: BankingService) { }

  ngOnInit(): void {
    (async () => {
      const config = await firstValueFrom(this.bankingService.config);
      this.accountsControl.setValue(config.accounts);
      this.yearsControl.setValue(config.years);
      this.banksControl.setValue(config.banks);
      this.viewControl.setValue(config.view);
    })();
  }

  public get accounts(): Observable<string[]> {
    return this.bankingService.accounts;
  }

  public get years(): Observable<number[]> {
    return this.bankingService.years;
  }

  public get banks(): Observable<string[]> {
    return this.bankingService.banks;
  }

  public setValues(value: string): void {
    switch (value) {
      case 'accounts':
        this.bankingService.accounts = this.accountsControl.value;
        break;
      case 'banks':
        this.bankingService.banks = this.banksControl.value;
        break;
      case 'years':
        this.bankingService.years = this.yearsControl.value;
        break;
      case 'view':
        this.bankingService.view = this.viewControl.value;
    }
  }

  public parseStatements(event: Event): void {
    this.profileService.parseStatements((event.target as HTMLInputElement).files);
  }
}
