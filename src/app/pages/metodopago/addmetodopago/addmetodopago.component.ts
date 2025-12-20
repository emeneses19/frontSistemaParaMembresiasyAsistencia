import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MetodoPagoModel } from '../../../models/MetodoPago';

@Component({
  selector: 'app-addmetodopago',
  standalone: true,
  imports: [MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './addmetodopago.component.html',
  styleUrl: './addmetodopago.component.scss'
})
export class AddmetodopagoComponent  implements OnInit , OnDestroy{

  private fb = inject(FormBuilder);
    metodoPagoForm!:FormGroup;
    private valueChangesSubscription: Subscription = new Subscription();
  
    @Output() metodoPagoGuardado = new EventEmitter<MetodoPagoModel>();
    @Output() nombreIngresado = new EventEmitter<string>();
  
    ngOnInit(): void {
      this.metodoPagoForm = this.fb.group({
        nombre:['',[Validators.required,Validators.maxLength(100)]]
      })
      this.setupValueChangesEmitter();
    }
    ngOnDestroy(): void {
      this.valueChangesSubscription.unsubscribe();
    }
  
    guardarMetodoPago(){
      if(this.metodoPagoForm.valid){
        const nuevoMetodoPago: MetodoPagoModel = this.metodoPagoForm.value as MetodoPagoModel;
        this.metodoPagoGuardado.emit(nuevoMetodoPago);
        this.metodoPagoForm.reset();
      }
    }
  
    setupValueChangesEmitter() {
  
      const nombreControl = this.metodoPagoForm.get('nombre');
      if (nombreControl){
         this.valueChangesSubscription = this.metodoPagoForm.get('nombre')!.valueChanges.pipe(
      
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe((nombre: string) => {
        this.nombreIngresado.emit(nombre); 
      });
      }else{
        console.error("No se encontró el control 'nombrePeriodo' en el formulario.");
      }
     
    }

}
