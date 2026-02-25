import { Component, inject, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { ReporteMembresiaEstudianteData } from '../../../interfaces/membresia-estudiante-reports';
import { MembresiaModel } from '../../../models/Membresia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { PagoMembresiaComponent } from './pago-membresia/pago-membresia.component';


@Component({
  selector: 'app-membresia-cuenta',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule

  ],
  templateUrl: './membresia-cuenta.component.html',
  styleUrl: './membresia-cuenta.component.scss'
})
export class MembresiaCuentaComponent implements OnInit, OnChanges {
  totalListaSoloMembresias: MembresiaModel[] = [];
  deudaTotalGlobal: number = 0;
  tamanioPagina = 6;
  indexPagina = 0;
  listaMembresiasPaginada: MembresiaModel[] = [];
  totalSeleccionado: number = 0;
  cantidadSeleccionadas: number = 0;
  listadeMembresiasSeleccionadas: MembresiaModel[] = [];
  readonly dialogProcesarPago = inject(MatDialog);

  @Input() listaDeMembresiasDelEstudiante!: ReporteMembresiaEstudianteData;
  constructor() {
  }
  ngOnInit(): void {
    this.aplicarPaginacion();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaDeMembresiasDelEstudiante'] && this.listaDeMembresiasDelEstudiante) {
      this.ProcesarDatosMembresias();

    }
  }

  //abrir el formulario para procesar pago 
  abrirProcesarPagoMembresia(){
      const dialogRef = this.dialogProcesarPago.open(PagoMembresiaComponent,{
        
      })
    }
  //manejar seleccion de membresias
  membresiasSeleccionada(membresia: MembresiaModel) {
    this.calcularTotalPagar();

  }
  //metodo para calcular el total de selccionad
  calcularTotalPagar(){
    const seleccionados = this.totalListaSoloMembresias.filter(membresia=>membresia.seleccionada);
    this.cantidadSeleccionadas = seleccionados.length;
    this.listadeMembresiasSeleccionadas = seleccionados;
    this.totalSeleccionado = seleccionados.reduce((acumulador, m) => acumulador + (m.montoAbonar || 0), 0);
  }


  //validar el monto a pagar
  soloNumeros(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault();
    }
  }

  validarMonto(event: any, membresia: any) {

    const input = event.target;
    let valor = parseFloat(input.value);
    const saldoPendiente = membresia.montoesperado - membresia.montopagado;

    if (isNaN(valor)) return;
    if (valor > saldoPendiente) {
      input.value = saldoPendiente.toFixed(2);
      membresia.montoAbonar = saldoPendiente;
    }

    else if (valor < 1) {
      input.value = 1;
      membresia.montoAbonar = 1;
    } else {
      membresia.montoAbonar = valor;
    }
  }

  //para estilos y estados segun esi vencio o no
  getClassFecha(membresia: any): string {
    const hoy = new Date();
    const fechaVencimiento = new Date(membresia.fechalimitedepago);

    const estaPagado = (membresia.montoesperado ?? 0) - (membresia.montopagado ?? 0);
    if (estaPagado <= 0) {
      return 'pagado';
    }
    hoy.setHours(0, 0, 0, 0);
    fechaVencimiento.setHours(0, 0, 0, 0);
    if (hoy > fechaVencimiento) {
      return 'expired';
    } else {
      return 'pending';
    }


  }


  ProcesarDatosMembresias() {
    if (this.listaDeMembresiasDelEstudiante) {
      this.totalListaSoloMembresias = this.listaDeMembresiasDelEstudiante.membresias.map(membresia => {
        return {
          ...membresia,
          seleccionada: false,
          montoAbonar: membresia.montoesperado - membresia.montopagado,

        }

      })
      this.deudaTotalGlobal = this.listaDeMembresiasDelEstudiante.deudaTotal;
      this.indexPagina = 0;
      this.aplicarPaginacion();

    }
  }
  aplicarPaginacion(): void {
    const inicioIndex = this.indexPagina * this.tamanioPagina;
    const finalIndex = inicioIndex + this.tamanioPagina;
    this.listaMembresiasPaginada = this.totalListaSoloMembresias.slice(inicioIndex, finalIndex);
  }

  manejarCambioDePagina(event: PageEvent): void {
    this.tamanioPagina = event.pageSize;
    this.indexPagina = event.pageIndex;
    this.aplicarPaginacion();
  }

}
