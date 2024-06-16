import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingComponent } from './profile-banking.component';

describe('ProfileBankingComponent', () => {
  let component: ProfileBankingComponent;
  let fixture: ComponentFixture<ProfileBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
