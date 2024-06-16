import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-database-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './database-form.component.html',
  styleUrl: './database-form.component.scss'
})
export class DatabaseFormComponent {

  constructor(private databseService: DatabaseService) {}

  public remove(): void {
    this.databseService.delete().then(() => this.databseService.read());
  }
}
