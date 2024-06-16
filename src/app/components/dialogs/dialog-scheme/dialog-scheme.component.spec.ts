import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSchemeComponent } from './dialog-scheme.component';

describe('DialogSchemeComponent', () => {
  let component: DialogSchemeComponent;
  let fixture: ComponentFixture<DialogSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSchemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
