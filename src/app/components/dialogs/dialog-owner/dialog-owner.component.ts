import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { DatabaseService } from '../../../services/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

const NAME_PATTERN = "^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$"
const NUMBER_PATTERN = "^[0-9]*$"

@Component({
  selector: 'app-dialog-owner',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-owner.component.html',
  styleUrl: './dialog-owner.component.scss'
})
export class DialogOwnerComponent {

  constructor(private database: DatabaseService, private snackbar: MatSnackBar) {}

  databaseForm = new FormGroup({
    ssn: new FormControl(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern(NUMBER_PATTERN)
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
    ]),
    birth_date: new FormControl(null, [
      Validators.required
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(NUMBER_PATTERN)
    ]),
    email: new FormControl(null, [
      Validators.email
    ]),
    fico: new FormControl(null, [
      Validators.required,
      Validators.pattern(NUMBER_PATTERN)
    ]),
    address: new FormControl(null, [])
  });

  public create(): void {
    this.database.insert({
      'owners': [{
        ssn: this.databaseForm.controls.ssn.value,
        name: this.databaseForm.controls.name.value,
        birth_date: this.databaseForm.controls.birth_date.value,
        address: this.databaseForm.controls.address.value,
        phone: this.databaseForm.controls.phone.value,
        email: this.databaseForm.controls.email.value,
        fico: this.databaseForm.controls.fico.value
      }]
    }).then(() => {
      this.database.read('owners');
      this.snackbar.open('Owner added', 'Dismiss', { duration: 5 * 1000 });
    });
  }

}
