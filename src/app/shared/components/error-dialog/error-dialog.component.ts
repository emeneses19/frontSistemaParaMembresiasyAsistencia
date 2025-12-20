import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { ErrorDialogData } from '../../../interfaces/error-dialog-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MATERIAL_IMPORTS],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data:ErrorDialogData){
  
 }

}
