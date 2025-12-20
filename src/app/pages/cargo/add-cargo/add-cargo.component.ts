import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CargoModel } from '../../../models/Cargo';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';

@Component({
  selector: 'app-add-cargo',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS, 
    ReactiveFormsModule
  ],
  templateUrl: './add-cargo.component.html',
  styleUrl: './add-cargo.component.scss'
})
export class AddCargoComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  cargoForm!: FormGroup;
  private valueChangesSubsciption: Subscription = new Subscription();

  @Output() cargoGuardado = new EventEmitter<CargoModel>();
  @Output() nombreCargoIngresado = new EventEmitter<string>();

  ngOnInit(): void {
    this.cargoForm = this.fb.group({
      nombrecargo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],

    })
    this.setupValueChangesEmitter();
  }
  ngOnDestroy(): void {
    this.valueChangesSubsciption.unsubscribe();
  }

  guardarCargo() {
    if (this.cargoForm.valid) {
      const nuevocargo: CargoModel = this.cargoForm.value as CargoModel;
      this.cargoGuardado.emit(nuevocargo);

      this.cargoForm.reset();
    }


  }
  setupValueChangesEmitter() {
    const nombreControl = this.cargoForm.get('nombrecargo');
    if(nombreControl){
      this.valueChangesSubsciption = this.cargoForm.get('nombrecargo')!.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe((nombre:string)=>{
        this.nombreCargoIngresado.emit(nombre);
      })
    }else{
      console.error('No se encontro el control "nombrcargo" en el formulario')
    }
  }

}
