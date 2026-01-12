import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportCursosEstudianteData } from '../interfaces/cursos-estudiante-report';

@Injectable({
  providedIn: 'root'
})
export class ReporteCursosEstudianteService {
   URL='http://localhost:3000/estudiante-cursos';

  constructor(
    private _http: HttpClient

  ) { }

  obtenerListaDeCursosParaEstudiante(dni:string): Observable<ReportCursosEstudianteData[]>{
    return this._http.get<ReportCursosEstudianteData[]>(`${this.URL}/lista-cursos/${dni}`);
  }
}
