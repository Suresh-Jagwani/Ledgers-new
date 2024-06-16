import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '../../../../../modules/material.module';
import { BankingService } from '../../../../../services/banking.service';

@Component({
  selector: 'app-merchant-banking-form',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterLinkActive],
  templateUrl: './merchant-banking-form.component.html',
  styleUrl: './merchant-banking-form.component.scss'
})
export class MerchantBankingFormComponent {

  availableColors = [
    {name: 'Deposits', color: undefined, selected: true},
    {name: 'Withdrawals', color: 'primary', selected: true},
    {name: 'Payments', color: 'accent', selected: true},
    {name: 'Revenue', color: 'warn', selected: true},
  ];
  
  private ein: string;
  
  constructor(private bankingService: BankingService,  private route: ActivatedRoute) {}

  public parseStatements(event: Event): void {
    this.bankingService.insertBankStatement((event.target as HTMLInputElement).files);
  }
}