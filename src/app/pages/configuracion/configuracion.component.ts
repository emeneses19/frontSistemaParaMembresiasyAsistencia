import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Validadores } from '../../shared/validators/myvalidators';
import { ConfiguracionMembresiasService } from '../../services/configuracion-membresias.service';
import { ConfiguracionMembresiaModel } from '../../models/ConfiguracionSoftware';
import { SuccesDialogService } from '../../services/succes-dialog.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [MATERIAL_IMPORTS, MatTabsModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent  implements OnInit{
  private fb = inject(FormBuilder);
  configuracionMembresiaFormGroup!:FormGroup;
  cargando:boolean = false;
  configuracion:ConfiguracionMembresiaModel[] = [];
  private _dialogSucces = inject(SuccesDialogService);
  constructor(private _configuracionService:ConfiguracionMembresiasService){
  }

  ngOnInit(): void {
    
    this.configuracionMembresiaFormGroup = this.fb.group({
      idconfiguracionmembresia:[''],
      descripcion:['', [Validators.required, Validadores.sinEspacios] ],
      montoparamembresia:[1,[Validators.required, Validators.min(1)]],
      frecuenciamesesrenovacion:[1,[Validators.required, Validators.min(1)], ],
      cantidaddediasparapagar:[1, [Validators.required, Validators.min(1)]],
      activo:[true]

    })
    this.cargando = true;
    this.obtenerConfiguracion();

  }

  obtenerConfiguracion(){
    this._configuracionService.obtnerConfiguracionMembresia().subscribe((configuracion)=>{
      this.configuracion = configuracion;
      this.cargando = false;
      console.log(configuracion);
      this.asignarValores();
    })

  }
  asignarValores(){
    if(this.configuracion.length > 0){
      this.configuracionMembresiaFormGroup.patchValue(this.configuracion[0]);
    }
  }

  actualizarConfiguracion(){
    if(this.configuracionMembresiaFormGroup.valid){
      this._configuracionService.actualizarConfiguracionMembresia(this.configuracionMembresiaFormGroup.value).subscribe({
      next:()=>{
        this._dialogSucces.openSuccessDialog('CORRECTO','se actualizo correctamente!', 'Aceptar');
      },
      error:(err)=>{
        console.log('Ocurrio un error al actualizar la configuracion ', err);
      }
    })
    }
      
  } 

}
