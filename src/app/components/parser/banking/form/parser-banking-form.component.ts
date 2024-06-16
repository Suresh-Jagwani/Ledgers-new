import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';

@Component({
  selector: 'app-parser-banking-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './parser-banking-form.component.html',
  styleUrl: './parser-banking-form.component.scss'
})
export class ParserBankingFormComponent {
  
  availableColors = [
    {name: 'Deposits', color: undefined, selected: true},
    {name: 'Withdrawals', color: 'primary', selected: true},
    {name: 'Payments', color: 'accent', selected: true},
    {name: 'Revenue', color: 'warn', selected: true},
  ];
  
  private ein: string;
  
  constructor() {}
}
