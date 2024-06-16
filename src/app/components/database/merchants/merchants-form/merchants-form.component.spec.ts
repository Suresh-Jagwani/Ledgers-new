import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsFormComponent } from './merchants-form.component';

describe('MerchantsFormComponent', () => {
  let component: MerchantsFormComponent;
  let fixture: ComponentFixture<MerchantsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
