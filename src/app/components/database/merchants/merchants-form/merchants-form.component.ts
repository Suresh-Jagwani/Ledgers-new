import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../../../services/database.service';

@Component({
  selector: 'app-merchants-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './merchants-form.component.html',
  styleUrl: './merchants-form.component.scss'
})
export class MerchantsFormComponent {

  constructor(private database: DatabaseService) {}

  userForm = new FormGroup({
    ein: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern("^[0-9]*$")
    ]),
    name: new FormControl(null, []),
    industry: new FormControl(null, []),
    industry_other: new FormControl(null, []),
    legal_entity: new FormControl(null, []),
    start_date: new FormControl(null, []),
    primary_phone: new FormControl(null, []),
    secondary_phone: new FormControl(null, []),
    email: new FormControl(null, [Validators.email]),
    website: new FormControl(null, []),
    address: new FormControl(null, [])
  });

  insertMerchant() {
    this.database.insertMerchant([{
      ein: this.userForm.controls.ein.value,
      name: this.userForm.controls.name.value,
      industry: this.userForm.controls.industry.value,
      legal_entity: this.userForm.controls.legal_entity.value,
      start_date: this.userForm.controls.start_date.value,
      website: this.userForm.controls.website.value,
      address: this.userForm.controls.address.value,
      phone: this.userForm.controls.primary_phone.value,
      email: this.userForm.controls.email.value,
    }]);
  }
}
