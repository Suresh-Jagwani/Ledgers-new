import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-banking-calculator',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './profile-banking-calculator.component.html',
  styleUrl: './profile-banking-calculator.component.scss'
})
export class ProfileBankingCalculatorComponent implements OnInit {

  calculatorForm = new FormGroup({
    duration: new FormControl(null),
    timeframe: new FormControl('daily'), // Default to months
    pv: new FormControl(null),
    fv: new FormControl({value: null, disabled: true}),
    interestRate: new FormControl(null),
    payments: new FormControl({value: null, disabled: true}),
  });

  ngOnInit(): void {
    this.calculatorForm.valueChanges.subscribe(() => this.calculateLoan());
  }

  calculateLoan(): void {
    const { duration, timeframe, pv, interestRate } = this.calculatorForm.value;
    const fv = pv * this.calculateInterestRate(interestRate, timeframe, duration);
    const payments = fv / duration;
    this.calculatorForm.patchValue({ fv, payments });
  }

  private calculateInterestRate(rate: number, timeframe: string, duration: number): number {
    const periods = {'daily': 365, 'weekly': 52, 'monthly': 12}[timeframe];
    return Math.pow(Math.pow(1 + (rate / 100), 1 / (periods ? periods : 365)), duration);
  }

}
