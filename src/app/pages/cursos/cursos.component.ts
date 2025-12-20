import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatCardModule } from '@angular/material/card';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { AgregarCursoComponent } from './agregar-curso/agregar-curso.component';
import { CursoService } from '../../services/curso.service';
import { PeriodoService } from '../../services/periodo.service';
import { CursoModel } from '../../models/Curso';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { PeriodoModel } from '../../models/periodo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaInscripcionComponent } from './lista-inscripcion/lista-inscripcion.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    MatTabsModule,
    ListaCursosComponent,
    AgregarCursoComponent,
    ListaInscripcionComponent
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {
  cargando: boolean = false;
  cursos: CursoModel[] = [];
  periodos: PeriodoModel[] = [];
  tiempoDuracionSegundos: number = 5;
  curso: CursoModel = new CursoModel();
  cursoParaVerListaDeInscritos = new CursoModel();

  private _dialogSucces = inject(SuccesDialogService);
  private _snackBar = inject(MatSnackBar);

  constructor(
    private _cursoService: CursoService,
    private _periodoCurso: PeriodoService
  ) {

  }


  //para activar el tab al seleccionar un curso y ver inscritos
  @ViewChild('tabs') tabGroup!:MatTabGroup;
  tabActivoIndex:number = 0;


  ngOnInit(): void {
    this.cargando = true;
    this.obtenerPeriodos();
    this.obtenerListaDeCursos();
  }
  obtenerListaDeCursos() {
    this._cursoService.obtenerCursos().subscribe(cursos => {
      this.cursos = cursos;
      this.cargando = false;
    })
  }
  guardarCurso(curso: CursoModel) {
    this._cursoService.agregarCurso(curso).subscribe({
      next: () => {
        this._dialogSucces.openSuccessDialog('CORRECTO', 'Curso guardado con éxito', 'Aceptar');
        this.curso = new CursoModel();
        this.obtenerListaDeCursos();
      },
      error: (err) => {
        console.log('Ocurrio un error al crear curso ', err);
      }
    })
  }

  cursoAEditar(curso: CursoModel) {
    this.curso = { ...curso };
  }

  actualizarCurso(curso: CursoModel) {
    console.log(curso, 'Aqui lo que recibo del padre ')
    if (curso.idcurso) {
      this._cursoService.actualizarCurso(curso.idcurso, curso).subscribe({
        next: () => {
          this._dialogSucces.openSuccessDialog('CORRECTO', 'Curso actualizado correctamente', 'Aceptar');
          this.curso = new CursoModel();
          this.obtenerListaDeCursos();

        }, error: (err) => {
          console.log('Ocurrio un error al crear curso ', err);
        }
      })
    }
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      duration: this.tiempoDuracionSegundos * 10000,
    })
  }

  obtenerPeriodos() {
    this._periodoCurso.obtenerPeriodos().subscribe(periodos => {
      this.periodos = periodos; 0
    })
  }

  eliminarCurso(codigo: number) {
    this._cursoService.eliminarCurso(codigo).subscribe({
      next: () => {
        this.obtenerListaDeCursos();
        this._snackBar.open('Curso eliminado', 'Aceptar', {
          duration: this.tiempoDuracionSegundos * 1000
        })
      }
    })
  }

  verListDeInscritos(curso:CursoModel){
    this.cursoParaVerListaDeInscritos = curso;
    if(this.tabActivoIndex===1){
      this.tabActivoIndex = 0;
      setTimeout(()=>{
        this.tabActivoIndex = 1;
      },0);
    }else{
      this.tabActivoIndex = 1;
    }
  }
}
