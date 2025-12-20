import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetodoPagoModel } from '../../models/MetodoPago';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { MetodopagoService } from '../../services/metodopago.service';
import { AddmetodopagoComponent } from './addmetodopago/addmetodopago.component';

@Component({
  selector: 'app-metodopago',
  standalone: true,
  imports: [MATERIAL_IMPORTS, MatTableModule, AddmetodopagoComponent],
  templateUrl: './metodopago.component.html',
  styleUrl: './metodopago.component.scss'
})
export class MetodopagoComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  metodoPago: MetodoPagoModel = new MetodoPagoModel('');
  cargando: boolean = false;
  durationInSeconds = 5;
  nombreMetodoPagoIngresado: string = '';
  private dialogServiceSucces = inject(SuccesDialogService);

  constructor(private _metoDePagoService: MetodopagoService) {

  }
  ngOnInit(): void {
    this.cargando = true;
    this.obtenerMetodoDePago();
  }
  displayedColumns: string[] = ['idmetodosdepago', 'nombre', 'descripcion', 'acciones'];
  dataMetodoPago = new MatTableDataSource<MetodoPagoModel>([]);

  obtenerMetodoDePago() {
    this._metoDePagoService.obtenerMetododPago().subscribe(metodosPago => {
      this.dataMetodoPago.data = metodosPago;
      this.cargando = false;
      this.dataMetodoPago.filter = '';
      this.nombreMetodoPagoIngresado = '';
    })
  }

  agregarMetodoDePago(metodoPago: MetodoPagoModel) {
    this._metoDePagoService.agregarMetodoPago(metodoPago).subscribe({
      next: () => {
        this.obtenerMetodoDePago();
        this.dialogServiceSucces.openSuccessDialog('CORRECTO', 'Registro guardado correctamente', 'Aceptar')

      },
      error: (error) => {
        console.error('Error al agregar: ', error);
      }
    })

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    })
  }

  eliminarMetodoDePago(id: number) {
    this._metoDePagoService.eliminarMetodoPago(id).subscribe({
      next: () => {
        this.obtenerMetodoDePago();
        this.openSnackBar('Registro eliminado', 'Aceptar');
      },
      error:(error)=>{
        console.error('Error al eliminar: ', error);
      }
    })
  }

  buscarMetoDePago(nombre:string){
    if(nombre){
      const valorFiltro = nombre;
      this.dataMetodoPago.filter = valorFiltro.trim().toLowerCase();
      this.nombreMetodoPagoIngresado = nombre;
    }else{
      this.obtenerMetodoDePago();      
      this.dataMetodoPago.filter = '';
      this.nombreMetodoPagoIngresado = '';
    }

  }

}
