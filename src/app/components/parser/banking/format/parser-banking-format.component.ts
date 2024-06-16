import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';

@Component({
  selector: 'app-parser-banking-format',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './parser-banking-format.component.html',
  styleUrl: './parser-banking-format.component.scss'
})
export class ParserBankingFormatComponent implements OnChanges {

  @Input() format: any = {};

  ngOnChanges(changes: SimpleChanges): void {
  }
}
