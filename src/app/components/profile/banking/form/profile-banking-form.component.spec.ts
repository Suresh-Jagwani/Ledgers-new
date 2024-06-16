import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingFormComponent } from './profile-banking-form.component';

describe('ProfileBankingFormComponent', () => {
  let component: ProfileBankingFormComponent;
  let fixture: ComponentFixture<ProfileBankingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
