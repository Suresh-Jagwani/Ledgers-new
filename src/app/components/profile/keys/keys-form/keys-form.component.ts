import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';

@Component({
  selector: 'app-keys-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './keys-form.component.html',
  styleUrl: './keys-form.component.scss'
})
export class KeysFormComponent {

}
