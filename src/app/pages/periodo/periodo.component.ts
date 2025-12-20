import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddPeriodoComponent } from './add-periodo/add-periodo.component';
import {  PeriodoModel } from '../../models/periodo';
import { PeriodoService } from '../../services/periodo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { A11yModule } from "@angular/cdk/a11y";



@Component({
  selector: 'app-periodo',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    AddPeriodoComponent,
    MatTableModule,
    A11yModule
],
  templateUrl: './periodo.component.html',
  styleUrl: './periodo.component.scss'
})
export class PeriodoComponent implements OnInit {  
  private _snackBar = inject(MatSnackBar);
  periodo:PeriodoModel = new PeriodoModel('');
  peridos:PeriodoModel[] = [];
  cargando: boolean = false;
  durationInSeconds = 5;
  nombreIngresado: string ='';
  private dialogServiceSucces = inject(SuccesDialogService);

  constructor(private _periodoService: PeriodoService){

  }
  ngOnInit(): void {
    this.cargando = true;
    this.obtnerPeriodos();
  }
  
  displayedColumns: string[] = ['idperiodo', 'nombreperiodo', 'acciones'];
  dataSource = new MatTableDataSource<PeriodoModel>([ ]);

  obtnerPeriodos(){
    this._periodoService.obtenerPeriodos().subscribe(periodos =>{
      this.peridos = periodos;
      this.dataSource.data = periodos;
      this.cargando = false;
      this.dataSource.filter = '';
      this.nombreIngresado = '';
    })
  }
  agregarPeriodo(periodo: PeriodoModel){
    this._periodoService.agregarPeriodo(periodo).subscribe({
      next:()=>{
        this.obtnerPeriodos();
        this.dataSource.filter = '';
        this.nombreIngresado = ''
        this.dialogServiceSucces.openSuccessDialog('CORRECTO','Periodo guardado correctamente','Aceptar');
      },
      error:(err)=>{
        console.error('Error al agregar:', err);
      }
    });
  }

  eliminarPeriodo(id:number){
    this._periodoService.eliminarPeriodo(id).subscribe({
      next:()=>{
        this.obtnerPeriodos();
        this.openSnackBar('Periodo eliminado', 'Aceptar');
      },
      error:(err)=>{
        console.error('Error al eliminar:', err);
      }
    });
  }
  buscarPeriodoPorNombre(nombre: string){
    if(nombre){
      const filterValue = nombre;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.nombreIngresado = nombre;
    }else{
      this.obtnerPeriodos();
      this.dataSource.filter = '';
      this.nombreIngresado = '';
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:this.durationInSeconds * 1000,
    })
  }


}
