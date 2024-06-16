import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingSummaryComponent } from './profile-banking-summary.component';

describe('ProfileBankingSummaryComponent', () => {
  let component: ProfileBankingSummaryComponent;
  let fixture: ComponentFixture<ProfileBankingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
