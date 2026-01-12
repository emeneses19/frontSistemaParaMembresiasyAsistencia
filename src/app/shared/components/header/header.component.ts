import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MATERIAL_IMPORTS, RouterLink,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  nombreEmpresa = 'Nueva Acropolis';
  menuOpen = false;

  menuItems = [
    { label: 'Inicio', route: '/', active: true },
    { label: 'Cursos', route: '/cursos', active: false },
    { label: 'Estudiantes', route: '/estudiantes', active: false },
    { label: 'E. Cuenta', route: '/lista-general', active: false },
    { label: 'Asistencias', route: '/asistencias', active: false },
    { label: 'Auxiliar', route: '/auxiliar', active: false },
    { label: 'Configuración', route: '/configuracion', active: false }
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
