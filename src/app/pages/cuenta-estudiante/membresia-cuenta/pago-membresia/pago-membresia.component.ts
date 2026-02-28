import { Component, Inject, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../shared/material.imports';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MetodopagoService } from '../../../../services/metodopago.service';
import { MetodoPagoModel } from '../../../../models/MetodoPago';
import { SuccesDialogService } from '../../../../services/succes-dialog.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Validadores } from '../../../../shared/validators/myvalidators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembresiaModel } from '../../../../models/Membresia';
import { PagoMembresiaPayload } from '../../../../interfaces/pago-membresia';

@Component({
  selector: 'app-pago-membresia',
  standalone: true,
  imports: [MATERIAL_IMPORTS,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './pago-membresia.component.html',
  styleUrl: './pago-membresia.component.scss'
})
export class PagoMembresiaComponent implements OnInit {
  metodosDePago: MetodoPagoModel[] = [];
  private fb = inject(FormBuilder);
  pagoMembresiaForm!: FormGroup;



  constructor(
    private _medioDePagoService: MetodopagoService,
    private dialogRef: MatDialogRef<PagoMembresiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
    this.pagoMembresiaForm = this.fb.group({
      seriecorrelativopagomembresia: ['', [Validators.required, Validators.maxLength(10), Validadores.sinEspacios]],
      fecha: [new Date(), [Validators.required]],
      montotal: [this.data.total, [Validators.required]],
      idmetodosdepago: [null, [Validators.required]],
      observacion: [null],
      detallesMembresias: this.fb.array([], [Validators.required]),
    })
    this.obtenerMediosDePago();
    this.cargarDetallesMembresia();


  }
  procesarPago() {
    if (this.pagoMembresiaForm.valid) {
      const payload: PagoMembresiaPayload = this.pagoMembresiaForm.value;

      // Aquí llamarías a tu servicio para guardar en la base de datos
      console.log("JSON listo para enviar:", payload);
      this.dialogRef.close(payload);
    }
  }


  cargarDetallesMembresia() {
    const detallaArray = this.pagoMembresiaForm.get('detallesMembresias') as FormArray;
    this.data.membresias.forEach((m: MembresiaModel) => {
      detallaArray.push(this.fb.group({
        idmembresia: [m.idmembresia],
        descripcion_membresia: [m.descripcionmembresia || 'Pago Membresia'],
        montomembresia: [m.montoAbonar]
      }))
    });
  }
  obtenerMediosDePago() {
    this._medioDePagoService.obtenerMetododPago().subscribe(metodosPago => {
      this.metodosDePago = metodosPago;

    })
  }
}
