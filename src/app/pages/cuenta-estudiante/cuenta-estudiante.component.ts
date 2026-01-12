import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { CursoCuentaComponent } from './curso-cuenta/curso-cuenta.component';
import { MembresiaCuentaComponent } from './membresia-cuenta/membresia-cuenta.component';
import { EstudianteService } from '../../services/estudiante.service';
import { EstudianteModel } from '../../models/Estudiantes';
import { ReporteCursosEstudianteService } from '../../services/reporte-cursos-estudiante.service';
import { ReportCursosEstudianteData } from '../../interfaces/cursos-estudiante-report';

@Component({
  selector: 'app-cuenta-estudiante',
  standalone: true,
  imports: [
    RouterLink,
    MATERIAL_IMPORTS,
    MatExpansionModule,
    CursoCuentaComponent,
    MembresiaCuentaComponent,
  ],
  templateUrl: './cuenta-estudiante.component.html',
  styleUrl: './cuenta-estudiante.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuentaEstudianteComponent implements OnInit {
  readonly panelOpenState = signal(false);
  dniObtenida: string = '';
  estudianteEncontrado = new EstudianteModel();
  cargando: boolean = false;
  listaDeCursosDelEstudiante: ReportCursosEstudianteData[] = []

  constructor(
    private route: ActivatedRoute,
    private _estudianteService: EstudianteService,
    private _reporteCursosEstudiante: ReporteCursosEstudianteService
  ) {

  }
  
  ngOnInit() {
    this.obtenerDNIdesderoute();
    this.obtenerCursosParaElEstudiante(this.dniObtenida);


  }

  obtenerDNIdesderoute() {
    this.route.paramMap.subscribe(params => {
      const dni = params.get('dni');
      if (dni) {
        this.dniObtenida = dni;
        this.cargando = true;
        this.obtenerEstudiantePorDni(this.dniObtenida);
      }
    });
  }

  obtenerEstudiantePorDni(dni: string) {
    this._estudianteService.buscarEstudiantePorDNI(dni).subscribe(estudiante => {
      this.estudianteEncontrado = estudiante;
      this.cargando = false;
      console.log(this.estudianteEncontrado);
    })

  }

  obtenerCursosParaElEstudiante(dni: string) {
    this._reporteCursosEstudiante.obtenerListaDeCursosParaEstudiante(dni).subscribe(cursos => {
      this.listaDeCursosDelEstudiante = cursos;
    });
  }


}
