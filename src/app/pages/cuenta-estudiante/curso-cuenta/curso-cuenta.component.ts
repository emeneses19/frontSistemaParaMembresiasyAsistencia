import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { ReportCursosEstudianteData } from '../../../interfaces/cursos-estudiante-report';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PagarCursoComponent } from '../pagar-curso/pagar-curso.component';

@Component({
  selector: 'app-curso-cuenta',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    CommonModule

  ],
  templateUrl: './curso-cuenta.component.html',
  styleUrl: './curso-cuenta.component.scss'
})
export class CursoCuentaComponent implements OnInit, OnChanges {
  @Input() listaDeCursosDeEstudiante: ReportCursosEstudianteData[] = [];
  listaCursosPaginada: ReportCursosEstudianteData[] = []
  tamanioPagina = 6;
  indexPagina = 0;
  totalListaCursos = 0;
  readonly dialogPagoCurso = inject(MatDialog);

  constructor() {

  }
  ngOnInit(): void {
    this.aplicarPaginacion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaDeCursosDeEstudiante'] && this.listaDeCursosDeEstudiante) {
      this.totalListaCursos = this.listaDeCursosDeEstudiante.length;
      this.indexPagina = 0;
      this.aplicarPaginacion();
    }
  }


  abrirParaPagarCurso(idInscripcion:string){
    this.dialogPagoCurso.open(PagarCursoComponent,{
      data:{idinscripcion:idInscripcion}

    })
  }


  aplicarPaginacion(): void {
    const inicioIndex = this.indexPagina * this.tamanioPagina;
    const finalIndex = inicioIndex + this.tamanioPagina;
    this.listaCursosPaginada = this.listaDeCursosDeEstudiante.slice(inicioIndex, finalIndex);
  }

  manejarCambioDePagina(event: PageEvent): void {
    this.tamanioPagina = event.pageSize;
    this.indexPagina = event.pageIndex;
    this.aplicarPaginacion();
  }

  getClassEstado(estado: string): string {
    switch (estado) {
      case 'Pagado':
        return 'status-success';
      case 'Pendiente':
        return 'status-pending'
      default:
        return '';
    }
  }



}
