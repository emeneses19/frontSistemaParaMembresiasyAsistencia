import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiaCuentaComponent } from './membresia-cuenta.component';

describe('MembresiaCuentaComponent', () => {
  let component: MembresiaCuentaComponent;
  let fixture: ComponentFixture<MembresiaCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembresiaCuentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembresiaCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
