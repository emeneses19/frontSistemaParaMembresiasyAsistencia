import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportePagoCursoData } from '../interfaces/pago-curso-reporte-data';

@Injectable({
  providedIn: 'root'
})
export class ReportePagoCursosService {
  // private URL = 'http://localhost:3000/pago-cursos';

  // constructor(private _http: HttpClient) { }
  // obtenerPagos(fechaInicio: Date, fechaFin: Date): Observable<ReportePagoCursoData[]> {
  //   let params = new HttpParams();
  //   if (fechaInicio && fechaFin) {
  //     const inicioStr = this.formatDate(fechaInicio);

  //     const finStr = this.formatDate(fechaFin);

  //     params = params.set('fechaInicio', inicioStr);
  //     params = params.set('fechaFin', finStr);
  //   }
  //   return this._http.get<ReportePagoCursoData[]>(`${this.URL}/`, { params });
  // }

  // private formatDate(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }
}
