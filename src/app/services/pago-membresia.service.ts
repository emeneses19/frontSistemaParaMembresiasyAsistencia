import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoMembresiaPayload } from '../interfaces/pago-membresia';
import { Observable } from 'rxjs';
import { ReportePagoMembresiaData } from '../interfaces/pago-membresia-reporte-data';

@Injectable({
  providedIn: 'root'
})
export class PagoMembresiaService {
  URL = 'http://localhost:3000/pagomembresias';
  constructor(private _http: HttpClient) { }
  procesarPagoMembresia(payload: PagoMembresiaPayload): Observable<any> {
    return this._http.post(`${this.URL}/registrar`, payload);
  }
  previsualizarVenta(idPago: string): Observable<any> {
    return this._http.get(`${this.URL}/detalle/${idPago}`);
  }
  anularPagoMembresia(id: string, estado: string): Observable<any> {
    return this._http.patch(`${this.URL}/anular/${id}`, estado);
  }

  obtenerRegistroPagoPorFecha(fechaInicio: Date, fechaFin: Date): Observable<ReportePagoMembresiaData[]> {
    let params = new HttpParams();
    if (fechaInicio && fechaFin) {
      const inicioStr = this.formatDate(fechaInicio);
      const finStr = this.formatDate(fechaFin);
      params = params.set('fechaInicio', inicioStr);
      params = params.set('fechaFin', finStr);
    }
    return this._http.get<ReportePagoMembresiaData[]>(`${this.URL}/`, { params });

  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;

  }
}
