import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { AuxiliarComponent } from './pages/auxiliar/auxiliar.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ListaGeneralEstudiantesComponent } from './pages/lista-general-estudiantes/lista-general-estudiantes.component';
import { CuentaEstudianteComponent } from './pages/cuenta-estudiante/cuenta-estudiante.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    {
        path: 'estudiantes',
        loadComponent: () =>
            import('./pages/estudiantes/estudiantes.component')
                .then(m => m.EstudiantesComponent)
    },
    { path: 'cursos', 
        loadComponent:()=>
            import('./pages/cursos/cursos.component')
                    .then(m=>m.CursosComponent)
     },
    { path: 'pagos', 
        loadComponent:()=>
            import('./pages/pagos/pagos.component')
                    .then(m=>m.PagosComponent)
     },
    { path: 'asistencias', 
        loadComponent:()=>
        import('./pages/asistencia/asistencia.component')
                .then(m=>m.AsistenciaComponent) },
    { path: 'auxiliar',
        loadComponent:()=>
            import('./pages/auxiliar/auxiliar.component')
                    .then(m=>m.AuxiliarComponent)
     },
    { path: 'configuracion',
        loadComponent:()=>
            import('./pages/configuracion/configuracion.component')
                    .then(m=>m.ConfiguracionComponent)
     },
    { path: 'estado-cuenta/:dni', 
        loadComponent:()=>
            import('./pages/cuenta-estudiante/cuenta-estudiante.component')
                    .then(m=>m.CuentaEstudianteComponent)
    },
];
