import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { AuxiliarComponent } from './pages/auxiliar/auxiliar.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ListaGeneralEstudiantesComponent } from './pages/lista-general-estudiantes/lista-general-estudiantes.component';
import { CuentaEstudianteComponent } from './pages/cuenta-estudiante/cuenta-estudiante.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    {path: 'estudiantes', component:EstudiantesComponent},
    {path: 'cursos', component:CursosComponent},
    {path: 'lista-general', component:ListaGeneralEstudiantesComponent},
    {path: 'asistencias', component:EstudiantesComponent},
    {path: 'auxiliar', component:AuxiliarComponent},
    {path: 'configuracion', component:ConfiguracionComponent},
    {path: 'estado-cuenta/:dni', component:CuentaEstudianteComponent},
];
