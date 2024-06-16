import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { AssetsSalesComponent } from './assets-sales/assets-sales.component';
import { AssetsReoComponent } from './assets-reo/assets-reo.component';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [MaterialModule, AssetsSalesComponent, AssetsReoComponent],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent {

}
