import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoMembresiaPayload } from '../interfaces/pago-membresia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoMembresiaService {
  URL = 'http://localhost:3000/pagomembresias';
  constructor(private _http: HttpClient) { }
  procesarPagoMembresia(payload: PagoMembresiaPayload): Observable<any> {
    return this._http.post(`${this.URL}/registrar`, payload);
  }
}
