import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMembresiaPagosComponent } from './reporte-membresia-pagos.component';

describe('ReporteMembresiaPagosComponent', () => {
  let component: ReporteMembresiaPagosComponent;
  let fixture: ComponentFixture<ReporteMembresiaPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteMembresiaPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteMembresiaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
