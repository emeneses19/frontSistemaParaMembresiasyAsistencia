import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CargoModel } from '../../models/Cargo';
import { CargoService } from '../../services/cargo.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { AddCargoComponent } from './add-cargo/add-cargo.component';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [MATERIAL_IMPORTS, MatTableModule,AddCargoComponent],
  templateUrl: './cargo.component.html',
  styleUrl: './cargo.component.scss'
})
export class CargoComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  cargo: CargoModel = new CargoModel('');
  cargando:boolean = false;
  durationInseconds = 5;
  nombreCargoIngresado: string = '';
  private dialogServiceSucces = inject(SuccesDialogService);

  constructor( private _cargoService: CargoService){

  }
  ngOnInit(): void {
    this.cargando = true;
    this.obtenerCargos();
  }
  displayedColumns:string[] = ['idcargo', 'nombrecargo', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<CargoModel>([]);
  obtenerCargos(){
    this._cargoService.obtenerCargos().subscribe(cargos =>{
      this.dataSource.data = cargos;
      this.cargando = false;
      this.dataSource.filter = '';
      this.nombreCargoIngresado = '';
    })
  }

  agregarCargo(cargo:CargoModel){
    this._cargoService.agregarCargo(cargo).subscribe({
      next:()=>{
        this.obtenerCargos();
        this.dialogServiceSucces.openSuccessDialog('CORRECTO','Cargo guardado correctamente', 'Aceptar');
      },
      error:(err)=>{
                console.log('Error al guardar cargo ', err);
      }
    })
  }

  openSnackBar(message:string, action:string){
    this._snackBar.open(message, action,{
      duration:this.durationInseconds * 1000
    })
  }

  eliminarCargo(id:number){
    this._cargoService.eliminarCargo(id).subscribe({
      next:()=>{
        this.obtenerCargos();
        this.openSnackBar('Cargo eliminado', 'Aceptar');
      }
    })
  }

  buscarCargoPorNombre(nombre:string){
    if(nombre){
      const filterValue = nombre;
      this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
      this.nombreCargoIngresado = nombre;
    }else{
      this.obtenerCargos();
      this.dataSource.filter = '';
      this.nombreCargoIngresado = '';
    }
  }



}
