import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsistenciasComponent } from './lista-asistencias.component';

describe('ListaAsistenciasComponent', () => {
  let component: ListaAsistenciasComponent;
  let fixture: ComponentFixture<ListaAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAsistenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
