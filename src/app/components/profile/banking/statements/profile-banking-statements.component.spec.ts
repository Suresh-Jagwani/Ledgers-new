import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingStatementsComponent } from './profile-banking-statements.component';

describe('ProfileBankingStatementsComponent', () => {
  let component: ProfileBankingStatementsComponent;
  let fixture: ComponentFixture<ProfileBankingStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingStatementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
