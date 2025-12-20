import { Component, EventEmitter, Inject, inject, OnInit, Output, } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { EstudianteService } from '../../../services/estudiante.service';
import { EstudianteModel } from '../../../models/Estudiantes';
import { GrupomiembroService } from '../../../services/grupomiembro.service';
import { AreaService } from '../../../services/area.service';
import { AreaModel } from '../../../models/Area';
import { GrupoMiembroModel } from '../../../models/GrupoMiembro';
import { CargoModel } from '../../../models/Cargo';
import { CargoService } from '../../../services/cargo.service';
import { SuccesDialogService } from '../../../services/succes-dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregarestudiante',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTabsModule
  ],
  templateUrl: './agregarestudiante.component.html',
  styleUrl: './agregarestudiante.component.scss'
})
export class AgregarestudianteComponent implements OnInit {
  private fb = inject(FormBuilder);
  estudianteForm!: FormGroup;
  areas: AreaModel[] = [];
  grupos: GrupoMiembroModel[] = [];
  cargos: CargoModel[] = [];
  esEdicion: boolean = false;
  estudianteParaEditar: EstudianteModel | null = null;
  private _dialogSuccesService = inject(SuccesDialogService);

  @Output() estudianteGuardado = new EventEmitter<EstudianteModel>();

  constructor(
    private _estudianteService: EstudianteService,
    private _grupoMiembroService: GrupomiembroService,
    private _areaService: AreaService,
    private _cargoService: CargoService,
    private _dialogRef: MatDialogRef<AgregarestudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estudiante: EstudianteModel | null }

  ) {
  }

  ngOnInit(): void {
    this.obtenerListDeAreas();
    this.obtenerGrupoMiembros();
    this.obtenerCargos();
    this.estudianteForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{9,20}$/)]],
      correo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.email]],
      fechadenacimiento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      estado: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      esmiembro: [false],
      idgruposmiembro: [null],
      idarea: [null],
      detalle1: [''],
      detalle2: [''],
      idcargo: [null],

    });

    if (this.data && this.data.estudiante) {
      this.esEdicion = true;
      this.estudianteParaEditar = this.data.estudiante;
      this.estudianteForm.patchValue(this.estudianteParaEditar);
      this.estudianteForm.controls['dni'].disable();
    }

  }



  buscarPorDNI(dni: string) {
    console.log(dni);
    this._estudianteService.buscarEstudiantePorDNI(dni).subscribe({
      next: estudiante => {
        if (estudiante) {
          this.esEdicion = true;
          this.estudianteForm.patchValue(estudiante);

        }
      },
      error: err => {
        console.log('Estudiante no encontrado o error en el servicio:', err);
      }
    }

    )
  }

  obtenerListDeAreas() {
    this._areaService.obtenerAreas().subscribe(areas => {
      this.areas = areas;
    })
  }

  obtenerGrupoMiembros() {
    this._grupoMiembroService.obtenerGrupos().subscribe(grupos => {
      this.grupos = grupos;
    })
  }

  obtenerCargos() {
    this._cargoService.obtenerCargos().subscribe(cargos => {
      this.cargos = cargos;
    })
  }



  guardarEstudiante() {
    if (this.estudianteForm.valid) {

      const estudianteData = {
        ...this.estudianteParaEditar,
        ...this.estudianteForm.value
      } as EstudianteModel;
      if (this.esEdicion) {
        this._estudianteService.actualizarEstudiante(estudianteData.dni, estudianteData).subscribe({
          next: (estudianteActualizado) => {
            this._dialogSuccesService.openSuccessDialog('CORRECTO', 'Estudiante actualizado correctamente', 'Cerrar');
            this._dialogRef.close(estudianteActualizado);
            this.esEdicion = false;
            this.estudianteForm.reset();
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
          }
        })
      } else {
        this._estudianteService.crearEstududiante(estudianteData).subscribe({
          next: () => {
            this._dialogSuccesService.openSuccessDialog('CORRECTO', 'Registro creado correctamente', 'Aceptar');
            this.estudianteForm.reset();
            this.esEdicion = false;
          },
          error: (error) => {
            console.error('Error al agregar:', error);
          }
        });
      }


    }

  }


}
