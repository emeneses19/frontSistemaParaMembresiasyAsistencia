import { Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, finalize, map, Observable, of, startWith, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InscripcionCursoModel } from '../../../models/InscripcionCurso';
import { CursoModel } from '../../../models/Curso';
import { CursoService } from '../../../services/curso.service';
import { InscripcionService } from '../../../services/inscripcion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { PasaramiembroComponent } from '../../pasaramiembro/pasaramiembro.component';
import { EstudianteModel } from '../../../models/Estudiantes';




@Component({
  selector: 'app-lista-inscripcion',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    AsyncPipe,
    MatSlideToggleModule,
    CommonModule, //para pipes
    MatCheckboxModule,

  ],
  templateUrl: './lista-inscripcion.component.html',
  styleUrl: './lista-inscripcion.component.scss'
})
export class ListaInscripcionComponent implements OnInit, OnDestroy {

  cursoSeleccionado?: CursoModel;
  @Input()
  set curso(curso: CursoModel | undefined) {
    this.cursoSeleccionado = curso;
    if (curso && this.listaDeCursos.length > 0) {
      this.seleccionarCursoYLlenarInscritos(curso);
    }
    // Si no tenemos la lista de cursos, se manejará después en obtenerListaDeCursos()
  }
  cargando: boolean = false;
  listaDeInscripcion: InscripcionCursoModel[] = [];
  listaDeCursos: CursoModel[] = [];
  cursoControl = new FormControl<string | CursoModel>('');
  codigoCursoSeleccionado: number = 0;
  isChecked = true;
  private destroy$ = new Subject<void>();
  private _snackBar = inject(MatSnackBar);
  duracionEnSegundos = 5;
  nombreCursoActual: string = '';
  listaDeEstudiantesParaMiembro:InscripcionCursoModel[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private _cursoService: CursoService, private _inscripcionService: InscripcionService) {

  }

  displayedColumns: string[] = ['select', 'fecha', 'dni', 'nombres', 'estado', 'acciones'];
  dataInscripcion: MatTableDataSource<InscripcionCursoModel> = new MatTableDataSource<InscripcionCursoModel>([]);


  //para seleccionar
  selection = new SelectionModel<InscripcionCursoModel>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  opcionesCursosFiltradas$!: Observable<CursoModel[]>;

  ngOnInit() {
    this.cargando = true;
    this.obtenerListaDeCursos();
    //para seleccionar y pasaer a miembro observable 
    this.selection.changed.subscribe(() => {
    this.listaDeEstudiantesParaMiembro = this.selection.selected; 
  });

  }

  ngAfterViewInit() {
    this.dataInscripcion.paginator = this.paginator;
    this.dataInscripcion.sort = this.sort;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //Convertiendo a estudiantes para pasar a miembro 

  get convertirListaDeEstudiantesParaMiembros(): EstudianteModel[]{
    const estudiantesParaMiembo = this.listaDeEstudiantesParaMiembro.map(est=>{
    return est.Estudiante;
  });
  return estudiantesParaMiembo as EstudianteModel[];
  }
  


  //para el check box en la tabla

  obtenerFilasSeleccionables(): number {
    return this.dataInscripcion.data.filter(row =>
      row.estado === 'Activo' && !row.Estudiante?.esmiembro
    ).length;
  }

  isAllSelected() {
    const numSeleccionables = this.obtenerFilasSeleccionables();
    if (numSeleccionables === 0) {
      this.listaDeEstudiantesParaMiembro = [];
      return false;
    }
    const numSelected = this.selection.selected.length;
    return numSelected === numSeleccionables;


  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.dataInscripcion.data.forEach(row => {
    // Aplicamos la condición de habilitación:
    if (row.estado === 'Activo' && !row.Estudiante?.esmiembro) {
      this.selection.select(row);
    }
  });

  }

  checkboxLabel(row?: InscripcionCursoModel): string {
    if (!row) {
    const numSeleccionables = this.obtenerFilasSeleccionables();
    const numSelected = this.selection.selected.length;
    
    return `${this.isAllSelected() ? 'Deseleccionar' : 'Seleccionar'} todos (${numSelected} de ${numSeleccionables})`;
    }
    return `${this.selection.isSelected(row) ? 'Deseleccionar' : 'Seleccionar'} fila ${row.idcurso + 1}`;
  }

  //para filtro en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataInscripcion.filter = filterValue.trim().toLowerCase();

    if (this.dataInscripcion.paginator) {
      this.dataInscripcion.paginator.firstPage();
    }
  }

  //para agregar al filtro datos del estudinate y curso
  private customFilterPredicate(data: any, filter: string): boolean {
    // 1. Convertir el filtro de entrada a minúsculas
    const normalizedFilter = filter.trim().toLowerCase();
    const dataStr = (
      data.Estudiante.nombres +
      ' ' +
      data.Estudiante.apellidos +
      ' ' +
      data.dni +
      ' ' +
      data.Curso.nombre
    ).toLowerCase();
    return dataStr.includes(normalizedFilter);
  }



  //para mostrar en el input curso seleccionado
  displayCurso(curso: CursoModel | null): string {
    return curso ? `${curso.nombre} - ${curso.Periodo?.nombreperiodo ?? ''}` : '';
  }

  obtenerListaDeCursos() {
    this.cargando = true;
    this._cursoService.obtenerCursos().subscribe(cursos => {
      this.listaDeCursos = cursos;
      this.cargando = false;
      this.opcionesCursos();
      this.dataInscripcion.filterPredicate = this.customFilterPredicate;

      if (this.cursoSeleccionado) {
        this.seleccionarCursoYLlenarInscritos(this.cursoSeleccionado);
      }
    })
  }


  seleccionarCursoYLlenarInscritos(curso: CursoModel) {
    if (curso.idcurso) {
      // 1. Cargar el curso en el FormControl para el mat-autocomplete
      this.cursoControl.setValue(curso);

      // 2. Guardar el ID
      this.codigoCursoSeleccionado = curso.idcurso;
      this.nombreCursoActual = `${curso.idcurso}- ${curso.nombre}-${curso.Periodo?.nombreperiodo}`;

      // 3. Cargar la data de inscritos
      this.obtnerListaDeInscritos();
    }
  }

  private _filtrandoCursos(nombre: string): CursoModel[] {
    const filterValue = nombre.toLowerCase();
    return this.listaDeCursos.filter(curso => curso.nombre.toLowerCase().includes(filterValue));
  }


  opcionesCursos() {
    this.opcionesCursosFiltradas$ = this.cursoControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const nombre = typeof value === 'string'
          ? value
          : value?.nombre;
        return nombre
          ? this._filtrandoCursos(nombre)
          : this.listaDeCursos.slice();
      })
    );
  }

  onCursoSeleccionado(curso: CursoModel) {
    if (curso.idcurso) {
      this.codigoCursoSeleccionado = curso.idcurso;
      this.nombreCursoActual = `${curso.idcurso}- ${curso.nombre}-${curso.Periodo?.nombreperiodo}`
    }

  }


  obtnerListaDeInscritos() {
    this._inscripcionService.obtenerListaDeInscritosPorCurso(this.codigoCursoSeleccionado).subscribe(inscritos => {

      this.cargando = true;
      this.dataInscripcion.data = inscritos;
      this.cargando = false;
    })
  }

  abrirSnackBar() {
    this._snackBar.open('¡Se actualizo correctamente!', 'Cerrar', {
      duration: this.duracionEnSegundos * 1000,
    })
  }





  darDeBajaUnEstudinate(codigoIncripcion: string) {
    this.cargando = true;
    this._inscripcionService.darDeBaja(codigoIncripcion).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.log('Error al dar de baja a un estudinate: ', error);
        return of(null);
      }), finalize(() => {
        this.cargando = false
      })
    ).subscribe({
      next: () => {
        this.abrirSnackBar();
        this.cargando = false;
        this.obtnerListaDeInscritos();
      }
    })

  }

  reactivarUnEstudinate(codigoIncripcion: string) {
    this.cargando = true;
    this._inscripcionService.reactivarInscripcion(codigoIncripcion).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.log('Error al reactivar a un estudinate: ', error);
        return of(null);
      }), finalize(() => {
        this.cargando = false
      })
    ).subscribe({
      next: () => {
        this.abrirSnackBar();
        this.cargando = false;
        this.obtnerListaDeInscritos();
      }
    })

  }

  //para pasar a miembro los estudiantes

  abrirFormPasarMiembro(){
    const dialogRef = this.dialog.open(PasaramiembroComponent,{
      data:{estudiantes:this.convertirListaDeEstudiantesParaMiembros}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.obtnerListaDeInscritos();
        this.selection.clear();
        this.listaDeEstudiantesParaMiembro = []
;      }
    })

  }


}
