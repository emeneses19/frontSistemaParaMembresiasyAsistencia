import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SesionModel } from '../models/Sesion';
import { SesionData } from '../interfaces/sesion-report';
import { AsistenciaData } from '../interfaces/asistencia-report';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private URL = 'http://localhost:3000/sesiones'

  constructor(private _http: HttpClient) {
  }

  darDeBajaSesion(idSesion: string): Observable<any> {
    return this._http.patch(`${this.URL}/darbaja/${idSesion}`, { habilitado: false });

  }

  obtnerListaParaPasarAsistencia(idSesion: string): Observable<AsistenciaData[]> {
    return this._http.get<AsistenciaData[]>(`${this.URL}/lista/${idSesion}`);

  }

  obtenerSesiones(fechaInicio: Date, fechaFin: Date): Observable<SesionData[]> {
    let params = new HttpParams();
    if (fechaInicio && fechaFin) {
      const inicioStr = this.formatDate(fechaInicio);
      const finStr = this.formatDate(fechaFin);
      params = params.set('fechaInicio', inicioStr);
      params = params.set('fechaFin', finStr);
    }
    return this._http.get<SesionData[]>(`${this.URL}/lista`, { params });
  }

  guardarSesion(sesion: SesionModel): Observable<any> {
    return this._http.post<any>(`${this.URL}/crear`, sesion);
  }
  obtenerSesion(codigoSesion: string): Observable<SesionModel> {
    return this._http.get<SesionModel>(`${this.URL}/lista/${codigoSesion}`);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;

  }
}
