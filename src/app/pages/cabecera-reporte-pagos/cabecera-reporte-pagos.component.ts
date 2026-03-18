import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';


@Component({
  selector: 'app-cabecera-reporte-pagos',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule],
  templateUrl: './cabecera-reporte-pagos.component.html',
  styleUrl: './cabecera-reporte-pagos.component.scss'
})
export class CabeceraReportePagosComponent implements OnInit {
  filtroForm!: FormGroup;
  private fb = inject(FormBuilder);
  @Output() filtro = new EventEmitter<any>();

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      fechaInicio: [new Date, [Validators.required]],
      fechaFin: [new Date, [Validators.required]]
    });
  }


  buscar() {
    if (this.filtroForm.invalid) {
      return console.log("Fechas incorrectas");
    }
    this.filtro.emit(this.filtroForm.value);
  }


}
