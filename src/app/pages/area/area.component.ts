import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreaModel } from '../../models/Area';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { AreaService } from '../../services/area.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { error } from 'console';
import { AddAreaComponent } from './add-area/add-area.component';


@Component({
  selector: 'app-area',
  standalone: true,
  imports: [
            MATERIAL_IMPORTS, 
            MatTableModule,
            AddAreaComponent
            
          ],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent  implements OnInit{
  private _snackBar = inject(MatSnackBar);
  area: AreaModel = new AreaModel('');
  areas:AreaModel[] =[];
  cargando:boolean = false;
  durationInSeconds = 5;
  nombreIngresado:string = '';
  private dialogServiceSuceces = inject(SuccesDialogService);

  constructor(private _areaService: AreaService){

  }

  ngOnInit(): void {
    this.cargando = true;
    this.obtenerAreas();
  }
   displayedColumns:string[] =['idarea', 'nombrearea', 'descripcion', 'acciones']
   dataSource = new MatTableDataSource<AreaModel>([]);

  obtenerAreas(){
    this._areaService.obtenerAreas().subscribe(areas =>{
      this.areas = areas;
      this.dataSource.data = areas;

      this.cargando = false;
      this.dataSource.filter = '';
      this.nombreIngresado = '';
    })

  }

  agregarArea(area:AreaModel){
    this._areaService.agregarArea(area).subscribe({
      next:()=>{
        this.obtenerAreas;
        this.dialogServiceSuceces.openSuccessDialog('CORRECTO','Area guardado correctamente', 'Aceptar');

      },
      error:(error)=>{
        console.log('Error al guardar area ', error);
      }
    })
  }

  eliminarArea(id:number){
    this._areaService.eliminarArea(id).subscribe({
      next:()=>{
        this.obtenerAreas();
        this.openSnackBar('Area eliminado', 'Aceptar');
      }
    })

  }


  openSnackBar(message:string, action:string){
    this._snackBar.open(message, action,{
      duration:this.durationInSeconds * 1000,
    })
  }

  buscarAreaPorNombre(nombre:string){
    if(nombre){
      const filterValue = nombre;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.nombreIngresado = nombre;
    }else{
      this.obtenerAreas();
      this.dataSource.filter = '';
      this.nombreIngresado = '';
    }
  }


}
