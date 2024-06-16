import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseOwnersComponent } from './database-owners.component';

describe('DatabaseOwnersComponent', () => {
  let component: DatabaseOwnersComponent;
  let fixture: ComponentFixture<DatabaseOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseOwnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatabaseOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
