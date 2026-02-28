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
import { ReporteMembresiaEstudianteData } from '../../interfaces/membresia-estudiante-reports';
import { ReporteMembresiasEstudianteService } from '../../services/reporte-membresias-estudiante.service';
import { PagoMembresiaPayload } from '../../interfaces/pago-membresia';
import { PagoMembresiaService } from '../../services/pago-membresia.service';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
  // listaDeMembresiasDelEstudiante$!: Observable<ReporteMembresiaEstudianteData>;

  private dialogServiceSucces = inject(SuccesDialogService);

  constructor(
    private route: ActivatedRoute,
    private _estudianteService: EstudianteService,
    private _reporteCursosEstudiante: ReporteCursosEstudianteService,

  ) {

  }

  ngOnInit() {
    this.obtenerDNIdesderoute();
    this.obtenerCursosParaElEstudiante(this.dniObtenida);


  }

  // procesarPagoMembresia(payload: PagoMembresiaPayload) {
  //   this.cargandoPago = true;
  //   this._pagoMembresiaService.procesarPagoMembresia(payload).subscribe({
  //     next: () => {
  //       this.cargandoPago = false;
  //       this.dialogServiceSucces.openSuccessDialog(
  //         'CORRECTO',
  //         'pago realizado con éxito',
  //         'Cerrar'
  //       );
  //       this._reporteMembresiasEstudiante.obtenerListaMembresiasParaEstudiante(this.dniObtenida)
  //         .subscribe();
  //     },
  //     error: (err) => {
  //       console.log("El error al guardar el pago", err);
  //       this.cargandoPago = false;
  //     }

  //   })

  // }

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

  obtenerCursosParaElEstudiante(dni: string) {
    this._reporteCursosEstudiante.obtenerListaDeCursosParaEstudiante(dni).subscribe(cursos => {
      this.listaDeCursosDelEstudiante = cursos;
    });
  }



}
