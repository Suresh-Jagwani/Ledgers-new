import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsDatabaseComponent } from './merchants-database.component';

describe('MerchantsDatabaseComponent', () => {
  let component: MerchantsDatabaseComponent;
  let fixture: ComponentFixture<MerchantsDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantsDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
