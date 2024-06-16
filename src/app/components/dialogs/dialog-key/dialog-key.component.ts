import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { DatabaseService } from '../../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParserService } from '../../../services/parser.service';
import { Observable } from 'rxjs';
import { SchemeModel } from '../../../models/parser.model';
import { FunderModel } from '../../../models/database.model';

@Component({
  selector: 'app-dialog-key',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-key.component.html',
  styleUrl: './dialog-key.component.scss'
})
export class DialogKeyComponent implements OnInit {
  
  constructor(private parserService: ParserService, private databaseService: DatabaseService) {}

  ngOnInit(): void {
  }

  get schemes(): Observable<SchemeModel[]> {
    return this.parserService.schemes;
  }

  get funders(): Observable<FunderModel[]> {
    return this.databaseService.funders;
  }

  keyForm = new FormGroup({
    parser: new FormControl('Bank Statement', [
      Validators.required,
    ]),
    pattern: new FormControl(null, [
      Validators.required,
    ]),
    bank: new FormControl(null, [
      Validators.required
    ]),
    type: new FormControl('funder', [
      Validators.required
    ]),
    funder: new FormControl(null, [])
  });

  public insert(): void {
    const type = this.keyForm.get('type').value;
    this.parserService.insert([{
      scheme_id: this.keyForm.get('bank').value[0],
      type: 'key',
      kind: type,
      name: '',
      value_1: this.keyForm.get('pattern').value,
      value_2: type === 'funder' ? this.keyForm.get('funder').value[0] : null
    }])
  }
}
