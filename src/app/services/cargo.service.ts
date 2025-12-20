import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoModel } from '../models/Cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  URL = 'http://localhost:3000/cargos'

  constructor(private _http: HttpClient) { }

  obtenerCargos():Observable<CargoModel[]>{
    return this._http.get<CargoModel[]>(`${this.URL}`);
  }

  agregarCargo(cargo:CargoModel):Observable<CargoModel>{
    return this._http.post<CargoModel>(`${this.URL}/crear`,cargo);
  }

  eliminarCargo(id:number):Observable<any>{
    return this._http.delete<any>(`${this.URL}/eliminar/${id}`);
  }
}
