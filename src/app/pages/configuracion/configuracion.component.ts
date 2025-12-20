import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [MATERIAL_IMPORTS, MatTabsModule, MatSlideToggleModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {

}
