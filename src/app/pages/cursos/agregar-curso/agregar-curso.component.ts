import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoModel } from '../../../models/Curso';
import { PeriodoModel } from '../../../models/periodo';

@Component({
  selector: 'app-agregar-curso',
  standalone: true,
  imports: [MATERIAL_IMPORTS,   
            MatCardModule,
            MatDividerModule,
            ReactiveFormsModule
    ],
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.scss'
})
export class AgregarCursoComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  cursoForm!:FormGroup;
  esEdicion:boolean = false;

  @Output() cursoGuardado = new EventEmitter<CursoModel>();
  @Input() listaperiodos:PeriodoModel[] =[];
  @Input() cursoParaEditar:CursoModel = new CursoModel();
  @Output() cursoEditado = new EventEmitter<CursoModel>();



  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      idcurso:[''],
      nombre:['',[Validators.required,Validators.maxLength(100)]],
      costo:['',[Validators.required,Validators.min(1)]],
      idperiodo:['',[Validators.required]],
    })
    this.inicializarFormulario();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cursoParaEditar']){
      this.inicializarFormulario();
    }
  }

  limpiarPeriodo(){
    const idPeriodoControl = this.cursoForm.get('idperiodo');
    if(idPeriodoControl){
      idPeriodoControl.setValue(null);
    }
  }

  guardarCurso(){
    if(this.cursoForm.valid){
      const cursoActual = this.cursoForm.value as CursoModel;    
     if(this.esEdicion){
      this.cursoEditado.emit(cursoActual);
     }else {
      this.cursoGuardado.emit(cursoActual);
      
     }
     this.cursoForm.reset();
     this.esEdicion = false;
    }
  }

  inicializarFormulario(){
    if(!this.cursoForm){
      return
    }
    if(this.cursoParaEditar && this.cursoParaEditar.idcurso){
      this.esEdicion = true;
      this.cursoForm.patchValue(this.cursoParaEditar);
    }else{
      this.esEdicion = false;
      this.cursoForm.reset();
    }
  }
  


}
