import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantsDatabaseComponent } from './merchants-database/merchants-database.component';
import { MerchantsFormComponent } from './merchants-form/merchants-form.component';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [MaterialModule, MerchantsDatabaseComponent, MerchantsFormComponent],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.scss'
})
export class MerchantsComponent {
  userForm = new FormGroup({
    ein: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern("^[0-9]*$")
    ]),
    business_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

}
