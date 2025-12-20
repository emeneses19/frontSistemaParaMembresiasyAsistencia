import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GrupoMiembroModel } from '../models/GrupoMiembro';

@Injectable({
  providedIn: 'root'
})
export class GrupomiembroService {
  URL ='http://localhost:3000/grupomiembros'

  constructor(private _http:HttpClient) { }
  obtenerGrupos():Observable<GrupoMiembroModel[]>{
    return this._http.get<GrupoMiembroModel[]>(`${this.URL}`);
  }
  agregarGrupoMiembro(grupo:GrupoMiembroModel):Observable<GrupoMiembroModel>{
    return this._http.post<GrupoMiembroModel>(`${this.URL}/crear`,grupo);
  }
  eliminarGrupoMiembro(id:number):Observable<any>{
    return this._http.delete(`${this.URL}/eliminar/${id}`);
  }
}
