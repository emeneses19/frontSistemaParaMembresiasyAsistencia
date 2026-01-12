import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportePagoCursoService {
  URL='http://localhost:3000/pago-cursos';

  constructor(
    private _http: HttpClient,
    

  ) { }


}
