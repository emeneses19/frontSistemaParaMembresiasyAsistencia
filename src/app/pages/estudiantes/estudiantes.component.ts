import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { AgregarestudianteComponent } from './agregarestudiante/agregarestudiante.component';
import { EstudianteModel } from '../../models/Estudiantes';
import { EstudianteService } from '../../services/estudiante.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})


export class EstudiantesComponent implements OnInit {
  cargando: boolean = false;
  readonly dialog = inject(MatDialog);
  filterValue: 'all' | 'solo-miembros' | 'no-miembros' = 'all';
  estudiantes: EstudianteModel[] = [];
  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  constructor(private _estudianteService: EstudianteService) {
  }


  displayedColumns: string[] = ['nro', 'dni', 'nombres', 'apellidos', 'celular', 'correo', 'fechanac', 'direccion', 'estado', 'fecharegistro', 'esmiembro', 'fechaasignacionmiembro', 'grupo', 'area', 'cargo', 'fechaultmodificacion', 'tiempodemiembro', 'detalle1', 'detalle2', 'acciones'];
  dataEstudiante: MatTableDataSource<EstudianteModel> = new MatTableDataSource<EstudianteModel>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.cargando = true;
    this.obtenerListaEstudiantes();
  }

  obtenerListaEstudiantes() {
    this._estudianteService.obtenerEstudiantes().subscribe(estudiantes => {
      this.dataEstudiante.data = estudiantes;
      this.estudiantes = estudiantes;
      this.cargando = false;
    })
  }

  aplicarfiltro(filterValue: 'all' | 'solo-miembros' | 'no-miembros') {
    this.filterValue = filterValue;

    if (filterValue === 'all') {
      this.dataEstudiante.data = this.estudiantes;
    } else if (filterValue === 'solo-miembros') {
      this.dataEstudiante.data = this.estudiantes.filter(estudiante => estudiante.esmiembro);
    } else {
      this.dataEstudiante.data = this.estudiantes.filter(estudiante => !estudiante.esmiembro);
    }
  }


  exportarExcel() {

  }

  abrirFormEstudiante(estudianteParaEditar?:EstudianteModel) {
    const dialogRef = this.dialog.open(AgregarestudianteComponent,{
       data: { estudiante: estudianteParaEditar || null } 
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.estudianteActualizado){
        this.actualizarTablaVisualmente(result.estudianteActualizado);
      }

    });

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

  actualizarTablaVisualmente(estudianteGuardado: EstudianteModel): void {
    const estudiantesActuales = this.estudiantes;
    const index = estudiantesActuales.findIndex(e => e.dni === estudianteGuardado.dni); // Usamos DNI como clave de búsqueda

    if (index > -1) {
      //  Reemplaza el objeto antiguo con el nuevo
      estudiantesActuales[index] = estudianteGuardado;
    } else {
      // Añade el nuevo estudiante al inicio de la lista (aun no funciona)
      estudiantesActuales.unshift(estudianteGuardado);
    }

    // Aplica la copia del array para notificar a MatTableDataSource
    this.dataEstudiante.data = [...estudiantesActuales]; 
    // Mover el paginador a la primera página si es un nuevo registro (falta igual)
    if (index === -1 && this.dataEstudiante.paginator) {
        this.dataEstudiante.paginator.firstPage();
    }
  }

  crearEstudiante(estudiante: EstudianteModel) {
    this._estudianteService.crearEstududiante(estudiante).subscribe({
      next:()=>{
        this.obtenerListaEstudiantes();
      },
      error: (error)=>{
         console.error('Error al agregar:', error);
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:this.durationInSeconds * 1000,
    })
  }

  eliminarEstudiante(dni:string){
    this._estudianteService.eliminarEstudiante(dni).subscribe({
      next:()=>{
        this.obtenerListaEstudiantes();
        this.openSnackBar('Estudiante eliminado correctamente', 'Aceptar');

      }
    })
  }


  //calcular la cantidad de tiempo de un miembro
  calcularTiempoMiembro(fechaAsignacion: string | Date | undefined): string {
    if (!fechaAsignacion) {
      return '-';
    }

    const fechaInicio = new Date(fechaAsignacion);
    const hoy = new Date();

    // Si la fecha de inicio es inválida o en el futuro
    if (isNaN(fechaInicio.getTime()) || fechaInicio > hoy) {
      return 'Fecha inválida';
    }

    // Calcular la diferencia en milisegundos
    let diferencia = hoy.getTime() - fechaInicio.getTime();

    // Convertir milisegundos a años y meses (una aproximación simple)
    const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;
    const MS_PER_MONTH = MS_PER_YEAR / 12;

    const years = Math.floor(diferencia / MS_PER_YEAR);
    diferencia -= years * MS_PER_YEAR;

    const months = Math.floor(diferencia / MS_PER_MONTH);

    let resultado = '';
    if (years > 0) {
      resultado += `${years} año${years !== 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (years > 0) {
        resultado += ', ';
      }
      resultado += `${months} mes${months !== 1 ? 'es' : ''}`;
    }

    return resultado || 'Menos de un mes';
  }


}


