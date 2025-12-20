import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddgrupomiembroComponent } from './addgrupomiembro/addgrupomiembro.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupoMiembroModel } from '../../models/GrupoMiembro';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { GrupomiembroService } from '../../services/grupomiembro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grupomiembro',
  standalone: true,
  imports: [
    CommonModule,
    MATERIAL_IMPORTS, MatTableModule, AddgrupomiembroComponent
  ],
  templateUrl: './grupomiembro.component.html',
  styleUrl: './grupomiembro.component.scss'
})
export class GrupomiembroComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  grupoMiembro: GrupoMiembroModel = new GrupoMiembroModel('', new Date());
  cargando: boolean = false;
  durationInSecond = 5;
  nombreIngresado: string = '';
  private _dialogServiceSucces = inject(SuccesDialogService);
  constructor(private _grupoMiembroService: GrupomiembroService) {

  }
  ngOnInit(): void {
    this.cargando = true;
    this.obtenerGrupoMiembros();

  }

  displayedColumns: string[] = ['idgruposmiembro', 'nombredelgrupo', 'fechacreacion', 'acciones'];
  dataSource = new MatTableDataSource<GrupoMiembroModel>([]);
  obtenerGrupoMiembros() {
    this._grupoMiembroService.obtenerGrupos().subscribe(grupos => {
      this.dataSource.data = grupos;
      this.cargando = false;
      this.dataSource.filter = '';
      this.nombreIngresado = '';
    })
  }

  agregarGrupoMiembro(grupo: GrupoMiembroModel) {
    this._grupoMiembroService.agregarGrupoMiembro(grupo).subscribe({
      next: () => {
        this.obtenerGrupoMiembros();
        this._dialogServiceSucces.openSuccessDialog('CORRECTO', 'Grupo guardado correctamente', 'Aceptar')
      },
      error: (error) => {
        console.error('Error al agregar:', error);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSecond * 1000,
    })
  }

  eliminarGrupoMiembro(id: number) {
    this._grupoMiembroService.eliminarGrupoMiembro(id).subscribe({
      next: () => {
        this.obtenerGrupoMiembros();
        this.openSnackBar('Grupo eliminado', 'Aceptar');
      },
      error: (error) => {
        console.error('Error al agregar:', error);

      }
    })
  }

  buscarGrupoMiembroPorNombre(nombre: string) {
    if (nombre) {
      const filvalue = nombre;
      this.dataSource.filter = filvalue.trim().toLowerCase();
      this.nombreIngresado = nombre;
    } else {
      this.obtenerGrupoMiembros();
      this.dataSource.filter = '';
      this.nombreIngresado = '';
    }
  }

}
