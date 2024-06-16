import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { KeysTableComponent } from './keys-table/keys-table.component';
import { KeysFormComponent } from './keys-form/keys-form.component';

@Component({
  selector: 'app-keys',
  standalone: true,
  imports: [MaterialModule, KeysTableComponent, KeysFormComponent],
  templateUrl: './keys.component.html',
  styleUrl: './keys.component.scss'
})
export class KeysComponent {

}
