import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementLineComponent } from './statement-line.component';

describe('StatementLineComponent', () => {
  let component: StatementLineComponent;
  let fixture: ComponentFixture<StatementLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
