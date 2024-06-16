import { Component } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

const NAME_PATTERN = "^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$"
const NUMBER_PATTERN = "^[0-9]*$"

@Component({
  selector: 'app-dialog-funder',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-funder.component.html',
  styleUrl: './dialog-funder.component.scss'
})
export class DialogFunderComponent {

  constructor(private database: DatabaseService, private snackbar: MatSnackBar) {}

  databaseForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
    ]),
    website: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
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
    address: new FormControl(null, [])
  });

  public insert(): void {
    this.database.insert({
      'funders': [{
        name: this.databaseForm.controls.name.value,
        website: this.databaseForm.controls.website.value,
        address: this.databaseForm.controls.address.value,
        phone: this.databaseForm.controls.phone.value,
        email: this.databaseForm.controls.email.value
      }]
    }).then(() => {
      this.database.read('funders');
      this.snackbar.open('Funder added', 'Dismiss', { duration: 5 * 1000 });
    });
  }

}
