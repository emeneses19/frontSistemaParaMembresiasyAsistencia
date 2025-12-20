import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { AreaModel } from '../../../models/Area';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';

@Component({
  selector: 'app-add-area',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './add-area.component.html',
  styleUrl: './add-area.component.scss'
})
export class AddAreaComponent {
  
   private fb = inject(FormBuilder);
  areaForm!: FormGroup;
  private valueChangesSubsciption: Subscription = new Subscription();

  @Output() areaGuardado = new EventEmitter<AreaModel>();
  @Output() nombreIngresado = new EventEmitter<string>();

  ngOnInit(): void {
    this.areaForm = this.fb.group({
      nombrearea:['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion:['',[Validators.maxLength(60)]]
    })
    this.setupValueChangesEmitter();
  }

  ngOnDestroy(): void {
    this.valueChangesSubsciption.unsubscribe();
  }

  guardarArea(){
    if(this.areaForm.valid){
      const nuevoArea: AreaModel = this.areaForm.value as AreaModel;
      this.areaGuardado.emit(nuevoArea);
      this.areaForm.reset();
    }
    console.log('en el form ', this.areaGuardado);
  }


  setupValueChangesEmitter(){
    const nombreControl = this.areaForm.get('nombrearea');
    if(nombreControl){
      this.valueChangesSubsciption = this.areaForm.get('nombrearea')!.valueChanges.pipe(
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
