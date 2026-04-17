import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { DateValidators } from '../../../shared/validators/datevalidators';

@Component({
  selector: 'app-lista-asistencias',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './lista-asistencias.component.html',
  styleUrl: './lista-asistencias.component.scss'
})
export class ListaAsistenciasComponent implements OnInit {
  filtroForm!: FormGroup;
  private fb = inject(FormBuilder);
  constructor() {

  }
  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      fechaInicio: [new Date, [Validators.required, DateValidators.fechasOrdenadas]],
      fechaFin: [new Date, [Validators.required, DateValidators.fechasOrdenadas]]
    })
  }
  buscar() {

  }

}
