import { Component, Inject, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../shared/material.imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetodopagoService } from '../../../../services/metodopago.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursoModel } from '../../../../models/Curso';
import { Validadores } from '../../../../shared/validators/myvalidators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MetodoPagoModel } from '../../../../models/MetodoPago';
import { ReportCursosEstudianteData } from '../../../../interfaces/cursos-estudiante-report';

@Component({
  selector: 'app-pago-curso',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  templateUrl: './pago-curso.component.html',
  styleUrl: './pago-curso.component.scss'
})
export class PagoCursoComponent implements OnInit {
  metodosDePago: MetodoPagoModel[] = [];
  private fb = inject(FormBuilder);
  pagoCursoForm!: FormGroup;
  constructor(
    private _mediosDePago: MetodopagoService,
    private _dialogRef: MatDialogRef<CursoModel>,
    @Inject(MAT_DIALOG_DATA) public data: ReportCursosEstudianteData
  ) {


  }
  ngOnInit(): void {
    this.pagoCursoForm = this.fb.group({
      numeroserie: ['', [Validators.required, Validators.maxLength(10), Validadores.sinEspacios]],
      fechapago: [new Date(), [Validators.required]],
      montototal: [this.data.costoCurso, [Validators.required]],
      idmetodosdepago: [null, [Validators.required]],
      observaciones: [null],
      idinscripcion: [this.data.idinscripcion, [Validators.required]],
    })
    this.obtenerMediosDePago();
  }

  obtenerMediosDePago() {
    this._mediosDePago.obtenerMetododPago().subscribe(medio => {
      this.metodosDePago = medio;
    })
  }
  procesarPago() {
    if (this.pagoCursoForm.invalid) {
      return console.log('Formulario de pagar curso no válido');
    } else {
      console.log('listo para enviar data', this.pagoCursoForm.value);
      this._dialogRef.close(this.pagoCursoForm.value);
    }

  }
  // asignarDatosdeCurso(){
  //   if(this._dialogRef.)
  // }



}
