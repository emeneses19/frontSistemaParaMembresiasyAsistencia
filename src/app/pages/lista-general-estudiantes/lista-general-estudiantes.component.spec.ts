import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGeneralEstudiantesComponent } from './lista-general-estudiantes.component';

describe('ListaGeneralEstudiantesComponent', () => {
  let component: ListaGeneralEstudiantesComponent;
  let fixture: ComponentFixture<ListaGeneralEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGeneralEstudiantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaGeneralEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
