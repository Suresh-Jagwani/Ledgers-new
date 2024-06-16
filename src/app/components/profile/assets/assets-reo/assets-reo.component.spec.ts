import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsReoComponent } from './assets-reo.component';

describe('AssetsReoComponent', () => {
  let component: AssetsReoComponent;
  let fixture: ComponentFixture<AssetsReoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsReoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsReoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
