import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';
import { ProfileService } from '../../services/profile.service';
import { FunderModel, MerchantModel, OwnerModel } from '../../models/database.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  links: Routes = [];

  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.profileService.read(params['id']);
    });
    this.subscription.add(
      this.profileService.client$.subscribe(client => {
        if (client) {
          const parentRoute = this.router.config.find(r => r.path === `${client.class}/:id`);
          if (parentRoute && parentRoute.children) {
            this.links = parentRoute.children.filter(childRoute => childRoute.path !== '**');
          }
        }
      })
    );
  }
}
