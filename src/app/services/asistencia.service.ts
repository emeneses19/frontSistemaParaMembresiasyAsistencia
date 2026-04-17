import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  reporteDeAsistencia() {

  }

}
