import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { ParserFormComponent } from './form/parser-form.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parser',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, ParserFormComponent],
  templateUrl: './parser.component.html',
  styleUrl: './parser.component.scss'
})
export class ParserComponent {

}
