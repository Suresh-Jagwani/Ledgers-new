import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { RouterLink } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  @Output() sidebar = new EventEmitter<void>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  public toggleSideBar(): void {
    this.sidebar.emit();
  }

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

}

const TREE_DATA = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    route: '/'
  },
  {
    name: 'Database',
    icon: 'business',
    children: [
      {
        name: 'Funders',
        route: '/database/funders'
      },
      {
        name: 'Merchants',
        route: '/database/merchants'
      },
      {
        name: 'Owners',
        route: '/database/owners'
      },
    ],
  },
  {
    name: 'Parser',
    icon: 'edit',
    children: [
      {
        name: 'Schemes',
        route: '/parser/schemes'
      },
      {
        name: 'Keys',
        route: '/parser/keys'
      },
    ],
  },/*
  {
    name: 'Orange',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },*/
];