import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingStatsStatementComponent } from './profile-banking-stats-statement.component';

describe('ProfileBankingStatsStatementComponent', () => {
  let component: ProfileBankingStatsStatementComponent;
  let fixture: ComponentFixture<ProfileBankingStatsStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingStatsStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingStatsStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
