import { Component, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import {MatCardModule} from '@angular/material/card';
import { EstudianteModel } from '../../models/Estudiantes';
import { EstudianteService } from '../../services/estudiante.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-general-estudiantes',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS, 
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './lista-general-estudiantes.component.html',
  styleUrl: './lista-general-estudiantes.component.scss'
})
export class ListaGeneralEstudiantesComponent implements OnInit {
  cargando:boolean = false;
  listaDeEstudiantes:EstudianteModel[] = [];
  constructor(
              private _estudianteService:EstudianteService,
              private _router: Router
             ){

  }
  displayedColumns: string[] = ['dni', 'nombresYApellidos','celular', 'acciones' ];
  dataEstudiante: MatTableDataSource<EstudianteModel> = new MatTableDataSource<EstudianteModel>([]);
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.cargando = true;
    this.obtenerTodosLosEstudiantes();
    
  }

   obtenerTodosLosEstudiantes(){
    this._estudianteService.obtenerEstudiantes().subscribe(estudiantes=>{
      this.dataEstudiante.data = estudiantes;
      this.cargando = false;
    })
  }

  ngAfterViewInit() {
    this.dataEstudiante.paginator = this.paginator;
    this.dataEstudiante.sort = this.sort;
  }
  

 

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEstudiante.filter = filterValue.trim().toLowerCase();

    if (this.dataEstudiante.paginator) {
      this.dataEstudiante.paginator.firstPage();
    }
  }

  verEstadoDeCuenta(dni:string){
    this._router.navigate(['/estado-cuenta',dni]);
  }



}
