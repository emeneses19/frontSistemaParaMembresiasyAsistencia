import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InscripcionCursoModel } from '../models/InscripcionCurso';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  URL = 'http://localhost:3000/inscripciones';

  constructor(private _http: HttpClient) { }

  obtenerListaDeInscritosPorCurso(idcurso:number):Observable<InscripcionCursoModel[]>{
    return this._http.get<InscripcionCursoModel[]>(`${this.URL}/lista-estudiantes/${idcurso}`);
  }

  inscribirNuevoEstudianteACurso(nuevoInscripcion:InscripcionCursoModel):Observable<InscripcionCursoModel>{
    return this._http.post<InscripcionCursoModel>(`${this.URL}/crear`,nuevoInscripcion)

  }

  reactivarInscripcion(codigoInsscripcion:string):Observable<any>{
    return this._http.patch<any>(`${this.URL}/activar/${codigoInsscripcion}`,{});
  }
  
  darDeBaja(codigoInscripcion:string):Observable<any>{
    return this._http.patch(`${this.URL}/desactivar/${codigoInscripcion}`,{});
  }
}
