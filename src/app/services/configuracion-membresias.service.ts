import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionMembresiaModel } from '../models/ConfiguracionSoftware';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionMembresiasService {
  URL='http://localhost:3000/configuracionmembresia'

  constructor(private  _http: HttpClient) { }

  obtnerConfiguracionMembresia():Observable<ConfiguracionMembresiaModel[]>{
    return this._http.get<ConfiguracionMembresiaModel[]>(`${this.URL}/`);
  }

  actualizarConfiguracionMembresia(configuracion:ConfiguracionMembresiaModel):Observable<any>{
    return this._http.put(`${this.URL}/actualizar`,configuracion);
  }



}
