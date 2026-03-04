import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraReportePagosComponent } from './cabecera-reporte-pagos.component';

describe('CabeceraReportePagosComponent', () => {
  let component: CabeceraReportePagosComponent;
  let fixture: ComponentFixture<CabeceraReportePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabeceraReportePagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabeceraReportePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
