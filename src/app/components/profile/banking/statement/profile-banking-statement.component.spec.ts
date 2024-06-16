import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingStatementComponent } from './profile-banking-statement.component';

describe('ProfileBankingStatementComponent', () => {
  let component: ProfileBankingStatementComponent;
  let fixture: ComponentFixture<ProfileBankingStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
