import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersDatabaseComponent } from './owners-database.component';

describe('OwnersDatabaseComponent', () => {
  let component: OwnersDatabaseComponent;
  let fixture: ComponentFixture<OwnersDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnersDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnersDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
