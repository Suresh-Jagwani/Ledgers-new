import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseFundersComponent } from './database-funders.component';

describe('DatabaseFundersComponent', () => {
  let component: DatabaseFundersComponent;
  let fixture: ComponentFixture<DatabaseFundersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseFundersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatabaseFundersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
