import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingStatsBalanceComponent } from './profile-banking-stats-balance.component';

describe('ProfileBankingStatsBalanceComponent', () => {
  let component: ProfileBankingStatsBalanceComponent;
  let fixture: ComponentFixture<ProfileBankingStatsBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingStatsBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingStatsBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
