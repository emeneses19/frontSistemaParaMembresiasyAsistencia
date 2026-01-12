import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeriodoModel } from '../../../models/periodo';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Validadores } from '../../../shared/validators/myvalidators';

@Component({
  selector: 'app-add-periodo',
  standalone: true,
  imports: [MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './add-periodo.component.html',
  styleUrl: './add-periodo.component.scss'
})
export class AddPeriodoComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  periodoForm!:FormGroup;
  private valueChangesSubscription: Subscription = new Subscription();

  @Output() periodoGuardado = new EventEmitter<PeriodoModel>();
  @Output() nombreIngresado = new EventEmitter<string>();

  ngOnInit(): void {
    this.periodoForm = this.fb.group({
      nombreperiodo:['',[Validators.required,Validators.maxLength(45), Validadores.sinEspacios]]
    })
    this.setupValueChangesEmitter();
  }
  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  guardarPeriodo(){
    if(this.periodoForm.valid){
      const nuevoPeriodo: PeriodoModel = this.periodoForm.value as PeriodoModel;
      this.periodoGuardado.emit(nuevoPeriodo);
      this.periodoForm.reset();
    }
  }

  setupValueChangesEmitter() {

    const nombreControl = this.periodoForm.get('nombreperiodo');
    if (nombreControl){
       this.valueChangesSubscription = this.periodoForm.get('nombreperiodo')!.valueChanges.pipe(
      // 1. Espera 400ms antes de emitir (evita emitir en cada pulsación de tecla)
      debounceTime(400),
      // 2. Solo emite si el valor es diferente al anterior (optimización)
      distinctUntilChanged()
    ).subscribe((nombre: string) => {
      // 3. Emitir el valor actual del campo al componente padre
      this.nombreIngresado.emit(nombre); 
    });
    }else{
      console.error("No se encontró el control 'nombrePeriodo' en el formulario.");
    }
   
  }


}
