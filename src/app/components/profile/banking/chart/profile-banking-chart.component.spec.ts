import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBankingChartComponent } from './profile-banking-chart.component';

describe('ProfileBankingChartComponent', () => {
  let component: ProfileBankingChartComponent;
  let fixture: ComponentFixture<ProfileBankingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBankingChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBankingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
