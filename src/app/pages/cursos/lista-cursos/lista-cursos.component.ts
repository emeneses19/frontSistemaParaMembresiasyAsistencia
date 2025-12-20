import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { CursoModel } from '../../../models/Curso';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionComponent } from '../inscripcion/inscripcion.component';
import { ListaInscripcionComponent } from '../lista-inscripcion/lista-inscripcion.component';


@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    MatChipsModule,
    MatMenuModule, 
    MatDividerModule,
    
  ],
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.scss'
})
export class ListaCursosComponent implements OnInit, OnChanges  {
  @Input() listaDeCursos:CursoModel[] = [];
  @Output() cursoAEliminar = new EventEmitter<any>();
  @Output() cursoEditar = new EventEmitter<CursoModel>();
  //ver la lista de isncritos
  @Output() datosDelCurso = new EventEmitter<CursoModel>();

  listaCursosPaginada: CursoModel[] = [];
  tamanioPagina = 6;
  indexPagina = 0;
  totalCursos = 0;
  readonly dialogIncripcion = inject(MatDialog);

  constructor(){
  }  
  ngOnInit(): void {
    this.aplicarPaginacion();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaDeCursos'] && this.listaDeCursos) {
      this.totalCursos = this.listaDeCursos.length;
      this.indexPagina = 0;
      this.aplicarPaginacion();
    }
  }

  aplicarPaginacion(): void {
    const inicioIndex = this.indexPagina * this.tamanioPagina;
    const finalIndex = inicioIndex + this.tamanioPagina;
    this.listaCursosPaginada = this.listaDeCursos.slice(inicioIndex, finalIndex);
  }

  manejarCambioDePagina(event: PageEvent): void {
    this.tamanioPagina = event.pageSize; 
    this.indexPagina = event.pageIndex; 
    this.aplicarPaginacion(); 
  }

  eliminarCurso(id:number){
    this.cursoAEliminar.emit(id);
  }

  enviarCursoParaEditar(curso:CursoModel){
    this.cursoEditar.emit(curso);
  }

  abrirIncripcion(curso:CursoModel){
    const dialogRef = this.dialogIncripcion.open(InscripcionComponent,{
      data: {curso:curso}
    })

  }

  abrirListaDeInscritos(curso:CursoModel){
    this.datosDelCurso.emit(curso); }

 


}
