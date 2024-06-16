import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingBalancesComponent } from './profile-banking-balances.component';

describe('ProfileBankingBalancesComponent', () => {
  let component: ProfileBankingBalancesComponent;
  let fixture: ComponentFixture<ProfileBankingBalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingBalancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
