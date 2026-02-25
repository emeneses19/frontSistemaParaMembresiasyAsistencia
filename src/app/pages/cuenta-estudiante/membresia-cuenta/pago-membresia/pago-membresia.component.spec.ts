import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMembresiaComponent } from './pago-membresia.component';

describe('PagoMembresiaComponent', () => {
  let component: PagoMembresiaComponent;
  let fixture: ComponentFixture<PagoMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoMembresiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
