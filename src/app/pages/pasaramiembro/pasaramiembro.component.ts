import { Component, inject, Inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { GrupomiembroService } from '../../services/grupomiembro.service';
import { GrupoMiembroModel } from '../../models/GrupoMiembro';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstudianteModel } from '../../models/Estudiantes';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { SuccesDialogService } from '../../services/succes-dialog.service';

@Component({
  selector: 'app-pasaramiembro',
  standalone: true,
  imports: [MatDatepickerModule,
    MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './pasaramiembro.component.html',
  styleUrl: './pasaramiembro.component.scss'
})
export class PasaramiembroComponent  implements OnInit{

  gruposMiembro: GrupoMiembroModel[] = [];
  private fb = inject(FormBuilder);
  pasarAMiembroForm!:FormGroup;
  cargando:boolean = false;

  constructor(
    private _grupoMiembroService: GrupomiembroService,
    private _estudianteService:EstudianteService,
    private _succefullService: SuccesDialogService,
    private _dialogRef: MatDialogRef<PasaramiembroComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { estudiantes: EstudianteModel[]  }
    

  ){

  }

  ngOnInit(): void {
    this.pasarAMiembroForm = this.fb.group({
      estudiantes:this.fb.array([], Validators.required),
      idgruposmiembro:['', [Validators.required]],
      fechaasignacionmiembro:[new Date, [Validators.required]],
    });
    
    this.obtenerGruposMiembro();
    if(this.data && this.data.estudiantes){
      this.cargarEstudiantes(this.data.estudiantes);    }

  }
  //para guardar el paso a miembo de estudinates
  pasarAMiembroAEstudiantes(){
    if(this.pasarAMiembroForm.invalid){
      console.log("Forulario incorrecto");
      return
    }else{
      const { estudiantes,idgruposmiembro,fechaasignacionmiembro} = this.pasarAMiembroForm.value;
      this.cargando = true;
      this._estudianteService.asignarAMiembro(
        estudiantes, Number(idgruposmiembro),new Date(fechaasignacionmiembro)
      ).subscribe({
        next:(paso)=>{
          this.cargando = false;
          this._succefullService.openSuccessDialog('CORRECTO', 'Proceso exitoso');
          this.pasarAMiembroForm.reset();
          this.data.estudiantes = [];
          this._dialogRef.close(true);
        },
        error:err=>{
          this.cargando = false;
          console.log(`Este es el error al asignar a miembro ${err}`);
        }
      })

    }
  }


  get estudiantesFA():FormArray{
    return this.pasarAMiembroForm.get('estudiantes') as FormArray;
  }

  cargarEstudiantes(estudiantes:EstudianteModel[]){
    this.estudiantesFA.clear();
    estudiantes.forEach(est =>{
      this.estudiantesFA.push(
      this.fb.group({
        dni:[est.dni]        
      }))
    })
  }

  obtenerGruposMiembro(){
    this._grupoMiembroService.obtenerGrupos().subscribe((grupos)=>{
      this.gruposMiembro = grupos;
    })
  }

}
