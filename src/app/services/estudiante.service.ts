
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstudianteModel } from '../models/Estudiantes';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  URL = 'http://localhost:3000/estudiantes';

  constructor(private _http:HttpClient) { }

  obtenerEstudiantes():Observable<EstudianteModel[]>{
    return this._http.get<EstudianteModel[]>(`${this.URL}/todos`);
  }

  obtenerEstudiantesMiembros():Observable<EstudianteModel[]>{
    return this._http.get<EstudianteModel[]>(`${this.URL}/miembros`);
  }
  obtenerEstudiantesNoMiembros():Observable<EstudianteModel[]>{
    return this._http.get<EstudianteModel[]>(`${this.URL}/no-miembros`);
  }

  buscarEstudiantePorDNI(dni:string):Observable<EstudianteModel>{
    return this._http.get<EstudianteModel>(`${this.URL}/${dni}`);

  }

  crearEstududiante(estudiante: EstudianteModel):Observable<EstudianteModel>{
    return this._http.post<EstudianteModel>(`${this.URL}/crear`,estudiante);
  }

  eliminarEstudiante(dni:string):Observable<any>{
    return this._http.delete(`${this.URL}/eliminar/${dni}`);
  }

  actualizarEstudiante(dni:string, estudiante:EstudianteModel):Observable<EstudianteModel>{
    return this._http.put<EstudianteModel>(`${this.URL}/actualizar/${dni}`,estudiante);
  }

  asignarAMiembro(estudiantes:EstudianteModel[], idgruposmiembro:number, fecha:Date):Observable<any>{
    const payload = {
      estudiantes:estudiantes,
      idgruposmiembro: idgruposmiembro,
      fechaasignacionmiembro:fecha.toISOString().slice(0, 10)
    }
    return this._http.patch(`${this.URL}/asignar-miembro/`,payload);
  }
}
