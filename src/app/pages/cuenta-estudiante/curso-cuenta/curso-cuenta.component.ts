import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { ReportCursosEstudianteData } from '../../../interfaces/cursos-estudiante-report';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PagoCursoComponent } from './pago-curso/pago-curso.component';
import { CursoModel } from '../../../models/Curso';
import { PagoCursoData } from '../../../interfaces/pago-curso-data';
import { CursoStoreService } from '../../../services/curso-store.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { SuccesDialogService } from '../../../services/succes-dialog.service';

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
export class CursoCuentaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dni!: string;
  @Output() payload = new EventEmitter<PagoCursoData>();
  listaCursosPaginada: ReportCursosEstudianteData[] = []
  listaDeCursosDeEstudiante: ReportCursosEstudianteData[] = [];
  tamanioPagina = 6;
  indexPagina = 0;
  totalListaCursos = 0;
  readonly dialogPagoCurso = inject(MatDialog);
  private destroy$ = new Subject<void>();
  public estaCargando$;
  private succesDialogService = inject(SuccesDialogService);

  constructor(
    private _cursoStoreService: CursoStoreService
  ) {
    this.estaCargando$ = this._cursoStoreService.cargando$;

  }
  ngOnInit(): void {
    if (this.dni) {
      this._cursoStoreService.cargar(this.dni);
    }
    this.escucharCambios();

  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {
    this._cursoStoreService.limpiar();
    this.destroy$.next();
    this.destroy$.complete();

  }

  escucharCambios() {
    this._cursoStoreService.reporteCurso$
      .pipe(
        filter(data => data !== null),
        takeUntil(this.destroy$)
      )
      .subscribe(reporte => {

        if (reporte) {

          this.listaDeCursosDeEstudiante = reporte.map(c => {
            return {
              ...c
            };
          });
        }
        this.aplicarPaginacion();
        console.log('Reporte cargado en el Store:', reporte);
      });
  }


  abrirParaPagarCurso(curso: ReportCursosEstudianteData) {
    const dialogRef = this.dialogPagoCurso.open(PagoCursoComponent, {
      data: curso
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){

        console.log("Datos recibidos desde dialog", result);
        this.procesarpago(result);
      }
    })

  }
  procesarpago(payload: PagoCursoData) {
    this._cursoStoreService.pagar(payload).subscribe({
      next: (data) => {
        this.succesDialogService.openSuccessDialog('CORRECTO', `${data.msg} #Ticket: ${data.pago.seriecorrelativopagomembresia} - ${data.pago.numerocorrelativopagomembresia}`);


      },
      error: (err) => {
        return console.log('Error al procesar el pago membresia: ', err);
      }
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
