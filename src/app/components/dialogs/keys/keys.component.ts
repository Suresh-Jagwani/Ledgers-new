import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../services/database.service';
import { ParserService } from '../../../services/parser.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { ActivatedRoute } from '@angular/router';
import { FinancialsService } from '../../../services/financials.service';

@Component({
  selector: 'app-keys',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './keys.component.html',
  styleUrl: './keys.component.scss'
})
export class KeysComponent {

  private subscription: Subscription = new Subscription();
  public formats: any[];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.subscription.add(this.databaseService.formats$.subscribe(data => { this.formats = data; }));
  }

  parametersForm = new FormGroup({
    type: new FormControl(null, [
      Validators.required
    ]),
    value: new FormControl(null, [
      Validators.required,
    ]),
    format: new FormControl(null, [])
  });


  public insertKey(): void {
    this.databaseService.insertKeys([{
      type: this.parametersForm.controls.type.value,
      value: this.parametersForm.controls.value.value,
      format_id: this.parametersForm.controls.format.value
    }])
  }
}
