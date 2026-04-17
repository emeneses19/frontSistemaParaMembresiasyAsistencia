import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagoMembresiaComponent } from './detalle-pago-membresia.component';

describe('DetallePagoMembresiaComponent', () => {
  let component: DetallePagoMembresiaComponent;
  let fixture: ComponentFixture<DetallePagoMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePagoMembresiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallePagoMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
