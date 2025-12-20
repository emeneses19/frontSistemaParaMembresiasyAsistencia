import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaModel } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  URL = 'http://localhost:3000/areas';

  constructor(private _http: HttpClient) { }

  obtenerAreas(): Observable<AreaModel[]>{
    return this._http.get<AreaModel[]>(`${this.URL}`);
  }

  agregarArea(area: AreaModel):Observable<AreaModel>{
    return this._http.post<AreaModel>(`${this.URL}/crear`, area);
  }

  eliminarArea(id: number):Observable<any>{
    return this._http.delete(`${this.URL}/eliminar/${id}`);
  }
}
