import { Component, Inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccesDialogData } from '../../../interfaces/succes-dialog-data';


@Component({
  selector: 'app-succes-dialog',
  standalone: true,
  imports: [MATERIAL_IMPORTS],
  template: `
    <h2 mat-dialog-title class="success-title">{{ data.title }}</h2>
    <mat-dialog-content class="mat-typography">
      <p class="success-message">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button  [mat-dialog-close]="true" >
        {{ data.actionText }}
      </button>
    </mat-dialog-actions>
  `,
  styles:[
    `
    .success-title{
      background: #09D93E;
      color:#FFFFFF;
      text-align: center;
    }
    button {
    background: #2C3E50;
    color: #FFFFFF;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 2.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
  }
  
  button:hover {
    background: #34495E;
    box-shadow: 0 4px 8px rgba(11, 242, 69, 0.3);
    transform: translateY(-2px);
  }
  
  button:active {
    background: #1A252F;
    box-shadow: 0 2px 4px rgba(11, 242, 69, 0.2);
    transform: translateY(0);
  }

  `
  ]
})
export class SuccesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:SuccesDialogData){

  }


}
