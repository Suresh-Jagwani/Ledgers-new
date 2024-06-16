import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { ProfileService } from '../../../services/profile.service';
import { MatTableDataSource } from '@angular/material/table';
import { MerchantModel, OwnerModel } from '../../../models/database.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss'
})
export class ProfileOverviewComponent implements OnInit {

  class: string;
  profileImage: string;
  ownershipsColumns = [];
  info: MatTableDataSource<any> = new MatTableDataSource(null);
  ownerships: MatTableDataSource<any> = new MatTableDataSource(null);

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.client$.subscribe(client => {
      if (client) {
        this.class = client.class;
        this.info = new MatTableDataSource([
          {'category': 'Name', 'value': client.name},
          {'category': 'Address', 'value': client.address},
          {'category': 'Phone', 'value': client.phone},
          {'category': 'Email', 'value': client.email}
        ]);
        switch(client.class) {
          case 'merchant':
            this.ownerships = new MatTableDataSource((client as MerchantModel).owners);
            this.ownershipsColumns = ['owner_name', 'ownership', 'link'];
            this.profileImage = 'assets/images/merchant.jpg';
            break;
          case 'owner':
            this.ownerships = new MatTableDataSource((client as OwnerModel).merchants);
            this.ownershipsColumns = ['merchant_name', 'ownership', 'link'];
            this.profileImage = 'assets/images/owner.jpg';
            break;
          case 'funder':
            this.profileImage = 'assets/images/funder.jpg';
            break;
        }
      }
    });
  }


}
