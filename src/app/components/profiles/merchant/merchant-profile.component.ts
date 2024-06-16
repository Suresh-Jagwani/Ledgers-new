import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { MerchantOverviewComponent } from './merchant-overview/merchant-overview.component';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { MerchantModel } from '../../../models/database.model';
import { FinancialsService } from '../../../services/financials.service';
import { MerchantBankingComponent } from './banking/merchant-banking.component';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';

@Component({
    selector: 'app-merchant-profile',
    standalone: true,
    templateUrl: './merchant-profile.component.html',
    styleUrl: './merchant-profile.component.scss',
    imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, MerchantOverviewComponent, MerchantBankingComponent]
})
export class MerchantProfileComponent {
  links: Routes = [];
  activeLink = this.links[0];

  private subscription: Subscription = new Subscription();
  public merchant: MerchantModel;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    const parentRoute = this.router.config.find(r => r.path === 'merchant/:ein');
    if (parentRoute && parentRoute.children) {
      this.links = parentRoute.children.filter(childRoute => childRoute.path !== '**');;
      this.activeLink = this.links[0];
    }
    this.route.params.subscribe((params: Params) => {
      this.profileService.readMerchant(params['ein']);
    });
  }
}
