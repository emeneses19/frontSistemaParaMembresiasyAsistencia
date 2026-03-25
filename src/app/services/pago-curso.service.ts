import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoCursoData } from '../interfaces/pago-curso-data';
import { ReportePagoCursoData } from '../interfaces/pago-curso-reporte-data';

@Injectable({
  providedIn: 'root'
})
export class PagoCursoService {
  private URL = 'http://localhost:3000/pago-cursos';

  constructor(private _http: HttpClient) { }

  registrarPagoCurso(payload: PagoCursoData): Observable<any> {
    return this._http.post<any>(`${this.URL}/crear`, payload);
  }

  //Anular pago
  anularPagoCurso(id: string, estado: string): Observable<any> {
    return this._http.patch(`${this.URL}/anular/${id}`, estado);

  }
  ///Obtener pago por fecha
  obtenerPagos(fechaInicio: Date, fechaFin: Date): Observable<ReportePagoCursoData[]> {
    let params = new HttpParams();
    if (fechaInicio && fechaFin) {
      const inicioStr = this.formatDate(fechaInicio);

      const finStr = this.formatDate(fechaFin);

      params = params.set('fechaInicio', inicioStr);
      params = params.set('fechaFin', finStr);
    }
    return this._http.get<ReportePagoCursoData[]>(`${this.URL}/`, { params });
  }


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



}
