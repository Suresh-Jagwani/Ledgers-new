import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriasComponent } from './criterias.component';

describe('CriteriasComponent', () => {
  let component: CriteriasComponent;
  let fixture: ComponentFixture<CriteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
