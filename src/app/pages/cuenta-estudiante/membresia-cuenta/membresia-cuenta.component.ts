import { Component, EventEmitter, inject, Input, input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { PagoMembresiaPayload } from '../../../interfaces/pago-membresia';
import { EstudianteModel } from '../../../models/Estudiantes';
import { ReporteMembresiasEstudianteService } from '../../../services/reporte-membresias-estudiante.service';
import { PagoMembresiaService } from '../../../services/pago-membresia.service';
import { SuccesDialogService } from '../../../services/succes-dialog.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { MembresiaStoreService } from '../../../services/membresia-store.service';


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
export class MembresiaCuentaComponent implements OnInit, OnChanges, OnDestroy {
  listaDeMembresiasDelEstudiante!: ReporteMembresiaEstudianteData;
  totalListaSoloMembresias: MembresiaModel[] = [];
  deudaTotalGlobal: number = 0;
  tamanioPagina = 6;
  indexPagina = 0;
  listaMembresiasPaginada: MembresiaModel[] = [];
  totalSeleccionado: number = 0;
  cantidadSeleccionadas: number = 0;
  listadeMembresiasSeleccionadas: MembresiaModel[] = [];
  readonly dialogProcesarPago = inject(MatDialog);
  private succesDialogService = inject(SuccesDialogService);
  private destroy$ = new Subject<void>();

  @Input() dni!: string;
  constructor(
    public _store: MembresiaStoreService

  ) {
  }
  ngOnInit(): void {
    if (this.dni) {
      this._store.cargar(this.dni);
    }

    // Escuchar cuando el reporte llegue
    this._store.reporte$
      .pipe(
        filter(data => data !== null), // Ignora el null inicial
        takeUntil(this.destroy$)      // Limpieza automática
      )
      .subscribe(reporte => {

        if (reporte) {
          //this.listaMembresiasPaginada = reporte.membresias;
          this.totalListaSoloMembresias = reporte.membresias.map(m => {
            return {
              ...m,
              seleccionada: false,
              montoAbonar: m.montoesperado - m.montopagado
            };
          });
        }
        this.aplicarPaginacion();
        this.calcularTotalPagar();
        //console.log('Reporte cargado en el Store:', reporte);
      });

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {
    this._store.limpiar();
    this.destroy$.next();
    this.destroy$.complete();
  }
  //abrir el formulario para procesar pago 
  abrirProcesarPagoMembresia() {
    const dialogRef = this.dialogProcesarPago.open(PagoMembresiaComponent, {
      data: {
        membresias: this.listadeMembresiasSeleccionadas,
        total: this.totalSeleccionado
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Datos recibidos payload pagomembresias", result);
        //enviando al padre el payload
        this.procesarPagoMembresia(result);

      }
    })
  }
  //Procesar pago membresia
  procesarPagoMembresia(payload: PagoMembresiaPayload) {
    this._store.pagar(payload).subscribe({
      next: (data) => {
        this.listadeMembresiasSeleccionadas = [];
        this.totalSeleccionado = 0;
        this.cantidadSeleccionadas = 0;
        this.succesDialogService.openSuccessDialog('CORRECTO', `${data.msg} #Ticket: ${data.pago.seriecorrelativopagomembresia} - ${data.pago.numerocorrelativopagomembresia}`);
        console.log("Pago procesado con exito el store ya se actualizo", data);
      },
      error: (err) => {
        console.log('Error al procesar el pago membresia: ', err);
      }
    });
  }

  //manejar seleccion de membresias
  membresiasSeleccionada(membresia: MembresiaModel) {
    if (membresia.seleccionada && !membresia.montoAbonar) {
      membresia.montoAbonar = membresia.montoesperado - membresia.montopagado;
    }
    this.calcularTotalPagar();

  }
  //metodo para calcular el total de selccionad
  calcularTotalPagar() {
    const seleccionados = this.totalListaSoloMembresias.filter(membresia => membresia.seleccionada);
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

    if (isNaN(valor) || valor < 1) {
      valor = 1;
    }

    if (valor > saldoPendiente) {
      valor = saldoPendiente;

    }
    input.value = valor.toFixed(2);

    membresia.montoAbonar = valor;
    this.calcularTotalPagar(); // <--- Crucial para actualizar el total inferior
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



  aplicarPaginacion(): void {
    const inicioIndex = this.indexPagina * this.tamanioPagina;
    const finalIndex = inicioIndex + this.tamanioPagina;
    this.listaMembresiasPaginada = [...this.totalListaSoloMembresias.slice(inicioIndex, finalIndex)];
  }

  manejarCambioDePagina(event: PageEvent): void {
    this.tamanioPagina = event.pageSize;
    this.indexPagina = event.pageIndex;
    this.aplicarPaginacion();
  }

}
