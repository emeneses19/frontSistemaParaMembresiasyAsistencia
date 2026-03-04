import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCursoPagosComponent } from './reporte-curso-pagos.component';

describe('ReporteCursoPagosComponent', () => {
  let component: ReporteCursoPagosComponent;
  let fixture: ComponentFixture<ReporteCursoPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteCursoPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteCursoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
