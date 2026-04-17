import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsistenciaData } from '../../../interfaces/asistencia-report';
import { SesionData } from '../../../interfaces/sesion-report';
import { SesionService } from '../../../services/sesion.service';
import { AsistenciaService } from '../../../services/asistencia.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-llamar-lista',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  templateUrl: './llamar-lista.component.html',
  styleUrl: './llamar-lista.component.scss'
})
export class LlamarListaComponent implements OnInit {
  cargando: boolean = false;
  listaEstudiantes: AsistenciaData[] = [];
  datosSesion?: SesionData;
  private _snackBar = inject(MatSnackBar);
  private _duracionSegundos = 5;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SesionData,
    private _sesionService: SesionService,
    private _asistenciaService: AsistenciaService
  ) {
  }

  displayedColumns: string[] = ['nro', 'dni', 'nombrescompleto', 'asistio'];
  dataEstudiante: MatTableDataSource<AsistenciaData> = new MatTableDataSource<AsistenciaData>([]);
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.datosSesion = this.data;
    this.cargando = true;
    this.buscarListaEstudiantes(this.data.codigoSesion);
  }
  buscarListaEstudiantes(codigoSesion: string) {
    this.cargando = true;
    this._sesionService.obtnerListaParaPasarAsistencia(codigoSesion).subscribe((lista) => {
      this.dataEstudiante.data = lista;
      // console.log("LISTA PARA LLAMAR ASISTENCIAS", lista)
      this.cargando = false;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEstudiante.filter = filterValue.trim().toLowerCase();

    // if (this.dataEstudiante.paginator) {
    //   this.dataEstudiante.paginator.firstPage();
    // }
  }

  actualizarEstadoDeAsistencia(idAsistencia: string, asistio: boolean) {
    this._asistenciaService.registrarAsistenciaPorEstudiante(idAsistencia, asistio).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar(res.msg, 'Aceptar');
      },
      error: (err) => {
        return console.log("Ocurrio un error al registrar la asitencia ", err);
      }
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this._duracionSegundos * 1000,
    })
  }
}
