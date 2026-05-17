import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteDetallePagoMembresiaData } from '../interfaces/detalle-pago-membresia-reporte-data';

@Injectable({
  providedIn: 'root'
})
export class DetallePagoMembresiaService {
  
  private URL = 'http://localhost:3000/detallepagomembresias'

  constructor(private _http: HttpClient) { }
  obtenerDetalledePagoMembresiaPorFecha(fechaInicio: Date, fechaFin:Date): Observable<ReporteDetallePagoMembresiaData[]>{
      let params = new HttpParams();
        if (fechaInicio && fechaFin) {
          const inicioStr = this.formatDate(fechaInicio);
          const finStr = this.formatDate(fechaFin);
          params = params.set('fechaInicio', inicioStr);
          params = params.set('fechaFin', finStr);
        }
        return this._http.get<ReporteDetallePagoMembresiaData[]>(`${this.URL}`, {params});


  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;

  }
}
