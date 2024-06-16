import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { ParserBankingFormComponent } from './form/parser-banking-form.component';
import { ParserBankingFormatComponent } from './format/parser-banking-format.component';
import { ParserService } from '../../../services/parser.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parser-banking',
  standalone: true,
  imports: [MaterialModule, ParserBankingFormComponent, ParserBankingFormatComponent],
  templateUrl: './parser-banking.component.html',
  styleUrl: './parser-banking.component.scss'
})
export class ParserBankingComponent implements OnInit{

  private subscription: Subscription = new Subscription();
  public formats: any;

  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.subscription.add(this.parserService.schemes$.subscribe(data => {this.formats = data;}));
  }
}
