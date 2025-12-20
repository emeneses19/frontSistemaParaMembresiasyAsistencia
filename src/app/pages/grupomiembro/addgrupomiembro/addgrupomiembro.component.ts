import { Component, EventEmitter, inject, OnDestroy, OnInit, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { GrupoMiembroModel } from '../../../models/GrupoMiembro';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatDatepickerInput, MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: 'app-addgrupomiembro',
  standalone: true,
  imports: [MATERIAL_IMPORTS, ReactiveFormsModule, MatDatepickerInput,MatDatepickerModule],
  templateUrl: './addgrupomiembro.component.html',
  styleUrl: './addgrupomiembro.component.scss'
})
export class AddgrupomiembroComponent implements OnInit, OnDestroy{
  private fb = inject(FormBuilder);
  grupoMiembroForm!: FormGroup;
  private valueChangesSubscription: Subscription = new Subscription();

  @Output() grupoGuardado = new EventEmitter<GrupoMiembroModel>();
  @Output() nombreIngresado = new EventEmitter<string>();

  ngOnInit(): void {
    this.grupoMiembroForm = this.fb.group({
      nombredelgrupo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      fechacreacion:[new Date(),[Validators.required]]
    })
    this.setupValueChangesEmitter();
    
  }
  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  guardarGrupo(){
    if(this.grupoMiembroForm.valid){
      const nuevoGrupo: GrupoMiembroModel = this.grupoMiembroForm.value as GrupoMiembroModel;
      this.grupoGuardado.emit(nuevoGrupo);
      this.grupoMiembroForm.reset();
    }
        console.log('en el form ', this.grupoGuardado);
  }

  setupValueChangesEmitter(){
    const nombreControl = this.grupoMiembroForm.get('nombredelgrupo');
        if(nombreControl){
          this.valueChangesSubscription = this.grupoMiembroForm.get('nombredelgrupo')!.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged()
          ).subscribe((nombre:string)=>{
            this.nombreIngresado.emit(nombre);
          })
        }else{
          console.error('No se encontro el control "nombrearea" en el formulario')
        }
  }


}
