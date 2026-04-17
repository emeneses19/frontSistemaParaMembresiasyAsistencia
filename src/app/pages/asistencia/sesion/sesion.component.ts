import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrupoMiembroModel } from '../../../models/GrupoMiembro';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SesionModel } from '../../../models/Sesion';
import { GrupomiembroService } from '../../../services/grupomiembro.service';
import { Validadores } from '../../../shared/validators/myvalidators';

@Component({
  selector: 'app-sesion',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  templateUrl: './sesion.component.html',
  styleUrl: './sesion.component.scss'
})
export class SesionComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  sesionForm!: FormGroup;
  listaGrupos: GrupoMiembroModel[] = [];
  @Input() listaSesiones: SesionModel[] = [];
  @Output() sesion = new EventEmitter<SesionModel>();
  constructor(private _grupoService: GrupomiembroService) {

  }

  ngOnInit(): void {
    this.sesionForm = this.fb.group({
      nombre: ['', [Validators.required, Validadores.sinEspacios]],
      descripcion: [''],
      fechasesion: [new Date(), [Validators.required]],
      habilitado: [true, [Validators.required]],
      idgruposmiembro: [null, [Validators.required]],

    })
    this.obtnerGrupos();

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  guardarSesion() {
    if (this.sesionForm.invalid) {
      return console.log('Formulario incorrecto');
    } else {
      this.sesion.emit(this.sesionForm.value);
      this.limpiarFormulario();
    }


  }
  obtnerGrupos() {
    this._grupoService.obtenerGrupos().subscribe((grupos) => {
      this.listaGrupos = grupos;
    })

  }
  limpiarGrupo() {
    const idGruposMiembro = this.sesionForm.get('idgruposmiembro');
    if (idGruposMiembro) {
      idGruposMiembro.setValue(null);
    }

  }

  limpiarFormulario() {
    this.sesionForm.reset({
      nombre: '',
      descripcion: '',
      fechasesion: new Date(),
      habilitado: true,
      idgruposmiembro: null
    });
  }

  sugerirNombre() {
    // Obtener fecha seleccionado
    const fecha = this.sesionForm.get('fechasesion')?.value;
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();

    // Obtener grupo seleccionado
    const grupoId = this.sesionForm.get('idgruposmiembro')?.value;
    let grupoNombre = '';

    if (grupoId) {
      const grupo = this.listaGrupos.find(g => g.idgruposmiembro === grupoId);
      grupoNombre = grupo ? grupo.nombredelgrupo : `grupo${grupoId}`;
    }


    // Construir nombre: SESION DD-MM-YYYY + grupo + letra
    const nombreSesion = `SESION ${dia}-${mes}-${anio}${grupoNombre ? ' ' + grupoNombre : ''}`;

    // Asignar al formulario
    this.sesionForm.get('nombre')?.setValue(nombreSesion);

  }


}
