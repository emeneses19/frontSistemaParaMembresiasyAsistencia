import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccesDialogService } from '../../../services/succes-dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursoModel } from '../../../models/Curso';
import { InscripcionService } from '../../../services/inscripcion.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InscripcionCursoModel } from '../../../models/InscripcionCurso';

@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatDatepickerInput,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.scss'
})
export class InscripcionComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  inscripcionForm!:FormGroup;
  private _dialogSucces = inject(SuccesDialogService);
  private codigoIncripcion?:string;
  cargando: boolean = false;
  cargandoBusqueda: boolean = false;
  estudianteEncontrado:boolean = false;
  private destroy$ = new Subject<void>();


  constructor(
        private _incripcionService:InscripcionService,
        private _estudianteService:EstudianteService,
        private _dialogRef: MatDialogRef<InscripcionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { curso: CursoModel | null }
    
  ){
    this.codigoIncripcion = this.generarTimestampUnico();

  }

  generarTimestampUnico(): string {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); 
    const timePart = now.toLocaleTimeString('es-PE', { hour12: false }).replace(/:/g, ''); 
    const msPart = now.getMilliseconds().toString().padStart(3, '0');
    return `${datePart}${timePart}${msPart}`;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  ngOnInit(): void {
    this.initForm();
    this.cargaDatoDeCurso();   
    
  }
  private initForm():void{
    this.inscripcionForm = this.fb.group({
      idinscripcion:[this.codigoIncripcion,[Validators.required]],
      fechadeinscripcion:[new Date(), [Validators.required]],
      estado:['Activo',[Validators.required]],
      dni:['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      idcurso:['', [Validators.required]],
      nombreEstudiante:[{value:'', disabled:true}],
      datosCurso:[{value:'', disabled:true}]
    })
  }

  private cargaDatoDeCurso():void{
     if(this.data && this.data.curso){
      this.inscripcionForm.get('idcurso')?.patchValue(this.data.curso.idcurso);
      this.inscripcionForm.get('idcurso')?.disable();
      this.inscripcionForm.get('datosCurso')?.patchValue(`${this.data.curso.nombre}- ${this.data.curso.Periodo?.nombreperiodo} s/ ${this.data.curso.costo}`);
    }
  }
  
  buscarEstudianteDNI(){
    const dni = this.inscripcionForm.get('dni')?.value;
    this.estudianteEncontrado = false;
    if(!dni || this.inscripcionForm.get('dni')?.invalid){
      this.inscripcionForm.get('nombreEstudiante')?.patchValue('');
      return;
    }
    this.cargandoBusqueda = true;   
    this._estudianteService.buscarEstudiantePorDNI(dni).pipe(
      takeUntil(this.destroy$),
      catchError(error=>{
        console.log('Error al buscar estudiante: ', error);
        this.inscripcionForm.get('nombreEstudiante')?.patchValue('Estudiante no encontrado');
        this.estudianteEncontrado = false;
        return of(null);        
      }),
      finalize(()=>{
        this.cargandoBusqueda=false;
      })
    ).subscribe({
      next:(estudiante)=>{
        if(estudiante){
          this.inscripcionForm.get('nombreEstudiante')?.patchValue(`${estudiante.nombres} ${estudiante.apellidos}`);
          this.estudianteEncontrado = true;
        }else{
          this.inscripcionForm.get('nombreEstudiante')?.patchValue('No se encontró el estudiante con ese DNI.');
          this.estudianteEncontrado=false;
        }
      }
    })
  }

  guardarIncripcion(){
    if(this.inscripcionForm.invalid){
      this.inscripcionForm.markAllAsTouched();
      return;
    }else{
      const inscripcionData = this.inscripcionForm.getRawValue();
      const inscripcionPayload: InscripcionCursoModel = {
        idinscripcion: inscripcionData.idinscripcion,
        fechadeinscripcion: inscripcionData.fechadeinscripcion,
        estado: inscripcionData.estado,
        dni: inscripcionData.dni,
        idcurso: inscripcionData.idcurso,
    };
      this.cargando = true;
      this._incripcionService.inscribirNuevoEstudianteACurso(inscripcionPayload).pipe(
        takeUntil(this.destroy$),
        catchError(error=>{
          console.log('Error al registrar inscripcion: ', error);
        return of(null);  
        }),finalize(()=>{
          this.cargando=false
        })
      ).subscribe(response =>{
        if(response){
          this._dialogSucces.openSuccessDialog('CORRECTO', 'Registro exitoso', 'Aceptar');
          this._dialogRef.close(true);
        }        
      })
    }
  }

}
