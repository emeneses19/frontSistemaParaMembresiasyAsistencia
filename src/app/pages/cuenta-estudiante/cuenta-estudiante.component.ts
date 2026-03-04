import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { CursoCuentaComponent } from './curso-cuenta/curso-cuenta.component';
import { MembresiaCuentaComponent } from './membresia-cuenta/membresia-cuenta.component';
import { EstudianteService } from '../../services/estudiante.service';
import { EstudianteModel } from '../../models/Estudiantes';
import { ReporteCursosEstudianteService } from '../../services/reporte-cursos-estudiante.service';
import { ReportCursosEstudianteData } from '../../interfaces/cursos-estudiante-report';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { AsyncPipe } from '@angular/common';
import { PagoCursoService } from '../../services/pago-curso.service';
import { PagoCursoData } from '../../interfaces/pago-curso-data';

@Component({
  selector: 'app-cuenta-estudiante',
  standalone: true,
  imports: [
    RouterLink,
    MATERIAL_IMPORTS,
    MatExpansionModule,
    CursoCuentaComponent,
    MembresiaCuentaComponent,
    AsyncPipe
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
  cargandoPago: boolean = false;
  cargandoEstudiante: boolean = false;
  listaDeCursosDelEstudiante: ReportCursosEstudianteData[] = []

  private dialogServiceSucces = inject(SuccesDialogService);

  constructor(
    private route: ActivatedRoute,
    private _estudianteService: EstudianteService,


  ) {

  }

  ngOnInit() {
    this.obtenerDNIdesderoute();

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
    this.cargandoEstudiante = true;
    this._estudianteService.buscarEstudiantePorDNI(dni).subscribe(estudiante => {
      this.estudianteEncontrado = estudiante;
      this.cargandoEstudiante = false;
      console.log(this.estudianteEncontrado);
    })

  }





}
