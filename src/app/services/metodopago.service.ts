import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPagoModel } from '../models/MetodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {
  private URL = 'http://localhost:3000/metodospago';

  constructor(private _http: HttpClient) { }

  obtenerMetododPago():Observable<MetodoPagoModel[]>{
    return this._http.get<MetodoPagoModel[]>(`${this.URL}`);
  }

  agregarMetodoPago(metodoPago: MetodoPagoModel):Observable<MetodoPagoModel>{
    return this._http.post<MetodoPagoModel>(`${this.URL}/crear`,metodoPago);
  }

  eliminarMetodoPago(id:number):Observable<any>{
    return this._http.delete(`${this.URL}/eliminar/${id}`);
  }
}
