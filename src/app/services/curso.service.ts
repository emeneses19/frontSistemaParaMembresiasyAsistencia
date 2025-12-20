import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoModel } from '../models/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  URL='http://localhost:3000/cursos';

  constructor(private _http: HttpClient) { }

  obtenerCursos():Observable<CursoModel[]>{
    return this._http.get<CursoModel[]>(`${this.URL}/`);
  }

  agregarCurso(curso:CursoModel):Observable<CursoModel>{
    return this._http.post<CursoModel>(`${this.URL}/crear`,curso);
  }
  actualizarCurso(codigo:number,curso:CursoModel):Observable<CursoModel>{
    return this._http.put<CursoModel>(`${this.URL}/${codigo}`,curso);
  }
  eliminarCurso(codigo:number): Observable<any>{
    return this._http.delete(`${this.URL}/${codigo}`);
  }
}
