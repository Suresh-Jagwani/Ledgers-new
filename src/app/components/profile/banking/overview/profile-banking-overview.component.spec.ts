import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingOverviewComponent } from './profile-banking-overview.component';

describe('ProfileBankingOverviewComponent', () => {
  let component: ProfileBankingOverviewComponent;
  let fixture: ComponentFixture<ProfileBankingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
