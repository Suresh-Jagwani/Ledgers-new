import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseMerchantsComponent } from './database-merchants.component';

describe('DatabaseMerchantsComponent', () => {
  let component: DatabaseMerchantsComponent;
  let fixture: ComponentFixture<DatabaseMerchantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseMerchantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatabaseMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
