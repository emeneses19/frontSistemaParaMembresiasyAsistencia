import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaEstudianteComponent } from './cuenta-estudiante.component';

describe('CuentaEstudianteComponent', () => {
  let component: CuentaEstudianteComponent;
  let fixture: ComponentFixture<CuentaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
