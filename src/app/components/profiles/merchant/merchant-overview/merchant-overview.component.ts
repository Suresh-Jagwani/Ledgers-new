import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MerchantModel } from '../../../../models/database.model';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'app-merchant-overview',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './merchant-overview.component.html',
  styleUrl: './merchant-overview.component.scss'
})
export class MerchantOverviewComponent implements OnInit {
  
  public merchant: MerchantModel;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.client$.subscribe(
      (merchant) => {
      }
    )
  }

}
