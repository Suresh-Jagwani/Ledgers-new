import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { DatabaseFormComponent } from './form/database-form.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, DatabaseFormComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {

  constructor(private databaseService: DatabaseService) {}

  public remove(): void {
    this.databaseService.delete().then(() => this.databaseService.read());
  }

  public refresh(): void {
    this.databaseService.read();
  }
}
