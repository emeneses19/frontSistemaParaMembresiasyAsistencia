import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReporteMembresiaEstudianteData } from '../interfaces/membresia-estudiante-reports';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteMembresiasEstudianteService {
  URL = 'http://localhost:3000/membresias'

  constructor(private _http:HttpClient) { }

  obtenerListaMembresiasParaEstudiante(dni:string):Observable<ReporteMembresiaEstudianteData>{
    return this._http.get<ReporteMembresiaEstudianteData>(`${this.URL}/todo/${dni}`);
  }

}
