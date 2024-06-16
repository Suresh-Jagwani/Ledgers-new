import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { ParserService } from '../../../services/parser.service';
import { ParserParametersComponent } from '../parameters/parser-parameters.component';
import { ParserSettingsComponent } from '../parser-settings/parser-settings.component';

@Component({
  selector: 'app-parser-schemes',
  standalone: true,
  imports: [MaterialModule, ParserParametersComponent, ParserSettingsComponent],
  templateUrl: './parser-schemes.component.html',
  styleUrl: './parser-schemes.component.scss'
})
export class ParserSchemesComponent implements OnInit {
  
  data = [];

  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.parserService.schemes$.subscribe(schemes => { this.data = schemes; });
  }

}
