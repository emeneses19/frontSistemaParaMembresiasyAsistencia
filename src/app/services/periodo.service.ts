import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  PeriodoModel } from '../models/periodo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  URL =   'http://localhost:3000/periodos';

  constructor(private _http: HttpClient) { 
  }

  obtenerPeriodos(): Observable<PeriodoModel[]>{
    return this._http.get<PeriodoModel[]>(`${this.URL}`);
  }
  agregarPeriodo(periodo: PeriodoModel):Observable<PeriodoModel>{
    return this._http.post<PeriodoModel>(`${this.URL}/crear`,periodo);
  }
  eliminarPeriodo(idperiodo:number): Observable<any>{
    return this._http.delete(`${this.URL}/periodo/${idperiodo}`);
  }
}
