import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiaPagosComponent } from './membresia-pagos.component';

describe('MembresiaPagosComponent', () => {
  let component: MembresiaPagosComponent;
  let fixture: ComponentFixture<MembresiaPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembresiaPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembresiaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
