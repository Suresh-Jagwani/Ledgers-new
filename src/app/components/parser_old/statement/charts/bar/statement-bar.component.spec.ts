import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementBarComponent } from './statement-bar.component';

describe('StatementBarComponent', () => {
  let component: StatementBarComponent;
  let fixture: ComponentFixture<StatementBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
