import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsistenciasMiembrosData } from '../interfaces/asistencias-miembros-report';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private URL = 'http://localhost:3000/asistencias';

  constructor(private _http: HttpClient) {

  }
  registrarAsistenciaPorEstudiante(idAsistencia: string, asistio: boolean): Observable<any> {
    return this._http.patch(`${this.URL}/registrar/${idAsistencia}`, { asistio });

  }
  reporteDeAsistenciaPorFecha(fechaInicio: Date, fechaFin: Date, codigoGrupo?: string): Observable<AsistenciasMiembrosData[]> {
    let params = new HttpParams();
    if (fechaInicio && fechaFin) {
      const inicioStr = this.formatDate(fechaInicio);
      const finStr = this.formatDate(fechaFin);
      params = params.set('fechaInicio', inicioStr);
      params = params.set('fechaFin', finStr);
    }
    if (codigoGrupo) {
      params = params.set('idgruposmiembro', codigoGrupo);

    }
    return this._http.get<AsistenciasMiembrosData[]>(`${this.URL}/lista`, { params });


  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;

  }

}
