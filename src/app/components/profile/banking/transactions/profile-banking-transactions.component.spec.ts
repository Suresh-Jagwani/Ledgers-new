import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingTransactionsComponent } from './profile-banking-transactions.component';

describe('ProfileBankingTransactionsComponent', () => {
  let component: ProfileBankingTransactionsComponent;
  let fixture: ComponentFixture<ProfileBankingTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
