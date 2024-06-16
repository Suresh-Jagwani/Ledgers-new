import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsSalesComponent } from './assets-sales.component';

describe('AssetsSalesComponent', () => {
  let component: AssetsSalesComponent;
  let fixture: ComponentFixture<AssetsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
