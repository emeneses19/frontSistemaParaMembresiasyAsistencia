import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { ReportCursosEstudianteData } from '../interfaces/cursos-estudiante-report';
import { ReporteCursosEstudianteService } from './reporte-cursos-estudiante.service';
import { PagoCursoService } from './pago-curso.service';
import { PagoCursoData } from '../interfaces/pago-curso-data';

@Injectable({
  providedIn: 'root'
})
export class CursoStoreService {
  private _reporteCurso = new BehaviorSubject<ReportCursosEstudianteData[] | null>(null);
  reporteCurso$ = this._reporteCurso.asObservable();
  private _cargando = new BehaviorSubject<boolean>(false);
  cargando$ = this._cargando.asObservable();
  private _dniActual: string | null = null;


  constructor(
    private reporteApi: ReporteCursosEstudianteService,
    private pagoCursoApi: PagoCursoService
  ) { }

  cargar(dni: string) {
    this._cargando.next(true);
    this._dniActual = dni;
    return this.reporteApi.obtenerListaDeCursosParaEstudiante(dni)
      .pipe(
        finalize(() => this._cargando.next(false))
      )
      .subscribe({
        next: (data) => {
          this._reporteCurso.next(data);
          this._cargando.next(false);

        },
        error: (error) => {
          this._cargando.next(false);
          console.error('Error cargando cursos desde servicio store', error);
        }
      })
  }
  pagar(payload: PagoCursoData) {
    return this.pagoCursoApi.registrarPagoCurso(payload).pipe(
      tap(() => {
        if (this._dniActual)
          this.cargar(this._dniActual);
      })
    )
  }

  limpiar() {
    this._reporteCurso.next(null);
    this._dniActual = null;

  }
}

