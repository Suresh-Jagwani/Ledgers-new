import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { DatabaseService } from '../../../services/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.scss'
})
export class MerchantsComponent {

  insudries = INDUSTRIES;

  constructor(private database: DatabaseService) {}

  merchantForm = new FormGroup({
    ein: new FormControl(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern(NUMBER_PATTERN)
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
    ]),
    industry: new FormControl(null, [Validators.required]),
    legal_entity: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [
      Validators.required
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(NUMBER_PATTERN)
    ]),
    email: new FormControl(null, [Validators.email]),
    website: new FormControl(null, []),
    address: new FormControl(null, [])
  });

  ownerForm = new FormGroup({
    ssn: new FormControl(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern(NUMBER_PATTERN)
    ]),
    first_name: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
    ]),
    last_name: new FormControl(null, [
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
    ownership: new FormControl(null, [
      Validators.required,
      Validators.pattern(NUMBER_PATTERN)
    ]),
    address: new FormControl(null, [])
  });


  public insertMerchant(): void {
    this.database.insertMerchant({
      'merchants': [{
        ein: this.merchantForm.controls.ein.value,
        name: this.merchantForm.controls.name.value,
        industry: this.merchantForm.controls.industry.value,
        legal_entity: this.merchantForm.controls.legal_entity.value,
        start_date: this.merchantForm.controls.start_date.value,
        website: this.merchantForm.controls.website.value,
        address: this.merchantForm.controls.address.value,
        phone: this.merchantForm.controls.phone.value,
        email: this.merchantForm.controls.email.value,
      }],
      'owners': [{
        ssn: this.ownerForm.controls.ssn.value,
        first_name: this.ownerForm.controls.first_name.value,
        last_name: this.ownerForm.controls.last_name.value,
        birth_date: this.ownerForm.controls.birth_date.value,
        address: this.ownerForm.controls.address.value,
        phone: this.ownerForm.controls.phone.value,
        email: this.ownerForm.controls.email.value,
        fico: this.ownerForm.controls.fico.value
      }],
      'ownerships': [{
        ein: this.merchantForm.controls.ein.value,
        ssn: this.ownerForm.controls.ssn.value,
        ownership: Number(this.ownerForm.controls.ownership.value)
      }]
    });
  }
}

const NAME_PATTERN = "^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$"
const NUMBER_PATTERN = "^[0-9]*$"


const INDUSTRIES = [
  {
    category: 'Entertainment and Nightlife',
    subCategory: [
      {value: 'Nightclub or Bar', viewValue: 'Nightclub or Bar'}
    ],
  },
  {
    category: 'Gaming and Gambling',
    subCategory: [
      {value: 'Casino', viewValue: 'Casino'},
      {value: 'Online Gambling', viewValue: 'Online Gambling'},
      {value: 'Lottery', viewValue: 'Lottery'},
    ],
  },
  {
    category: 'Food and Beverage',
    subCategory: [
      {value: 'Restaurant', viewValue: 'Restaurant'},
      {value: 'Coffee Shop', viewValue: 'Coffee Shop'},
      {value: 'Food Truck', viewValue: 'Food Truck'},
    ],
  },
  {
    category: 'Auto Sales and Services',
    subCategory: [
      {value: 'Auto Dealership', viewValue: 'Auto Dealership'},
      {value: 'Auto Repair Shop', viewValue: 'Auto Repair Shop'},
      {value: 'Car Wash', viewValue: 'Car Wash'},
    ],
  },
  {
    category: 'Travel and Tourism',
    subCategory: [
      {value: 'Travel Agency', viewValue: 'Travel Agency'},
      {value: 'Tour Operator', viewValue: 'Tour Operator'},
      {value: 'Cruise Line', viewValue: 'Cruise Line'},
    ],
  },
  {
    category: 'Hospitality and Lodging',
    subCategory: [
      {value: 'Hotel', viewValue: 'Hotel'},
      {value: 'Bed and Breakfast', viewValue: 'Bed and Breakfast'},
      {value: 'Vacation Rentals', viewValue: 'Vacation Rentals'},
    ],
  },
  {
    category: 'Construction and Real Estate',
    subCategory: [
      {value: 'General Contractor', viewValue: 'General Contractor'},
      {value: 'Real Estate Development', viewValue: 'Real Estate Development'},
      {value: 'Architectural Services', viewValue: 'Architectural Services'},
    ],
  },
  {
    category: 'Non-Profit Organization',
    subCategory: [
      {value: 'Charity', viewValue: 'Charity'},
      {value: 'Foundation', viewValue: 'Foundation'},
      {value: 'Humanitarian Organization', viewValue: 'Humanitarian Organization'},
    ],
  },
  {
    category: 'Mining and Natural Resources',
    subCategory: [
      {value: 'Coal Mining', viewValue: 'Coal Mining'},
      {value: 'Oil and Gas Extraction', viewValue: 'Oil and Gas Extraction'},
      {value: 'Renewable Energy', viewValue: 'Renewable Energy'},
    ],
  },
  {
    category: 'Retail and E-commerce',
    subCategory: [
      {value: 'Clothing Retail', viewValue: 'Clothing Retail'},
      {value: 'Electronics Retail', viewValue: 'Electronics Retail'},
      {value: 'Online Retail', viewValue: 'Online Retail'},
    ],
  },
  {
    category: 'Manufacturing and Production',
    subCategory: [
      {value: 'Metal Fabrication', viewValue: 'Metal Fabrication'},
      {value: 'Plastics Manufacturing', viewValue: 'Plastics Manufacturing'},
      {value: 'Food Production', viewValue: 'Food Production'},
    ],
  },
  {
    category: 'Retail and E-commerce',
    subCategory: [
      {value: 'Clothing Retail', viewValue: 'Clothing Retail'},
      {value: 'Electronics Retail', viewValue: 'Electronics Retail'},
      {value: 'Online Retail', viewValue: 'Online Retail'},
    ],
  },
  {
    category: 'Energy and Utilities',
    subCategory: [
      {value: 'Electric Utilities', viewValue: 'Electric Utilities'},
      {value: 'Natural Gas Utilities', viewValue: 'Natural Gas Utilities'},
      {value: 'Water Utilities', viewValue: 'Water Utilities'},
    ],
  },
  {
    category: 'Transportation and Logistics',
    subCategory: [
      {value: 'Freight Forwarding', viewValue: 'Freight Forwarding'},
      {value: 'Shipping and Freight', viewValue: 'Shipping and Freight'},
      {value: 'Warehousing', viewValue: 'Warehousing'},
    ],
  },
  {
    category: 'Healthcare and Medical Services',
    subCategory: [
      {value: 'Hospital', viewValue: 'Hospital'},
      {value: 'Dental Clinic', viewValue: 'Dental Clinic'},
      {value: 'Home Healthcare', viewValue: 'Home Healthcare'},
    ],
  },
  {
    category: 'Technology and Software',
    subCategory: [
      {value: 'Software Development', viewValue: 'Software Development'},
      {value: 'IT Consulting', viewValue: 'IT Consulting'},
      {value: 'Hardware Manufacturing', viewValue: 'Hardware Manufacturing'},
    ],
  },
  {
    category: 'Finance and Insurance',
    subCategory: [
      {value: 'Investment Banking', viewValue: 'Investment Banking'},
      {value: 'Insurance Broker', viewValue: 'Insurance Broker'},
      {value: 'Credit Union', viewValue: 'Credit Union'},
    ],
  },
  {
    category: 'Legal and Professional Services',
    subCategory: [
      {value: 'Law Firms', viewValue: 'Law Firms'},
      {value: 'Accounting Firms', viewValue: 'Accounting Firms'},
      {value: 'Management Consulting', viewValue: 'Management Consulting'},
    ],
  },
];