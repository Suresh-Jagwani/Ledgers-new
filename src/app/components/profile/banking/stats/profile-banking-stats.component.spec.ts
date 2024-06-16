import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingStatsComponent } from './profile-banking-stats.component';

describe('ProfileBankingStatsComponent', () => {
  let component: ProfileBankingStatsComponent;
  let fixture: ComponentFixture<ProfileBankingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
