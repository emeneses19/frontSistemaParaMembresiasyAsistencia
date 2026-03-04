import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoCursoData } from '../interfaces/pago-curso-data';

@Injectable({
  providedIn: 'root'
})
export class PagoCursoService {
  private URL = 'http://localhost:3000/pago-cursos';

  constructor(private _http: HttpClient) { }

  registrarPagoCurso(payload: PagoCursoData): Observable<any> {
    return this._http.post<any>(`${this.URL}/crear`, payload);
  }
}
