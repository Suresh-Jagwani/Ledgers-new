import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingCalculatorComponent } from './profile-banking-calculator.component';

describe('ProfileBankingCalculatorComponent', () => {
  let component: ProfileBankingCalculatorComponent;
  let fixture: ComponentFixture<ProfileBankingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
