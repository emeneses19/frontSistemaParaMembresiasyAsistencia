import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TableColumn } from '../../../interfaces/table-column.data';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DatePipe, CurrencyPipe, NgClass } from '@angular/common';


@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatInputModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './smart-table.component.html',
  styleUrl: './smart-table.component.scss'
})
export class SmartTableComponent<T> implements OnInit, OnChanges {
  @Input() datos: T[] = [];
  @Input() columnas: TableColumn<T>[] = [];
  @Output() accionEmitida = new EventEmitter<{ accion: string, fila: T }>();
  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;
  fuenteDatos!: MatTableDataSource<T>;
  columnasVisibles: string[] = [];
  @Input() mostrarBusquedaGlobal: boolean = true;
  @Input() mostrarPaginacion: boolean = true;

  //para resaltar las columnas segun estado
  @Input() claveColumnaEstado: string = '';
  @Input() valorEstado: string = '';
  @Input() colorResaltado: string = '#ffebee';
  @Input() colorTextoResaltado: string = '';


  //para filtro por columna
  filtrosPorColumna: { [key: string]: string } = {};
  filtroGlobal: string = '';
  ngAfterViewInit(): void {
    this.vincularPaginacionYOrden();
  }

  get columnasActivas(): TableColumn<T>[] {
    return this.columnas.filter(col => col.visible !== false);
  }

  get nombresColumnasVisibles(): string[] {
    return this.columnasActivas.map(col => col.clave.toString());
  }

  get nombresColumnasFiltro(): string[] {
    return this.columnasActivas.map(col => 'filtro_' + col.clave.toString());
  }

  //Para vver detalle
  emitirAccion(nombreAccion: string, fila: T): void {
    this.accionEmitida.emit({ accion: nombreAccion, fila: fila });
  }

  // --- CICLO DE VIDA ---

  ngOnInit(): void {
    this.fuenteDatos = new MatTableDataSource(this.datos);
    this.configurarFiltroPersonalizado();
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] && this.fuenteDatos) {
      this.fuenteDatos.data = this.datos;
    }
  }

  // --- LÓGICA DE TABLA ---

  private vincularPaginacionYOrden(): void {
    if (this.paginador) this.fuenteDatos.paginator = this.paginador;
    if (this.ordenamiento) this.fuenteDatos.sort = this.ordenamiento;
  }

  obtenerTotal(columnaClave: string): number {
    if (!this.fuenteDatos) return 0;
    return this.fuenteDatos.filteredData
      .reduce((acc, fila: any) => acc + (Number(fila[columnaClave]) || 0), 0);
  }

  cambiarVisibilidadColumna(columna: TableColumn<T>): void {
    columna.visible = !columna.visible;
    if (!columna.visible) {
      delete this.filtrosPorColumna[columna.clave as string];
      this.actualizarFiltroTabla();
    }
  }

  // --- FILTRADO ---

  aplicarFiltroColumna(clave: string, evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.filtrosPorColumna[clave] = valor.trim().toLowerCase();
    this.actualizarFiltroTabla();
  }

  aplicarFiltroGlobal(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.filtroGlobal = valor.trim().toLowerCase();
    this.actualizarFiltroTabla();
  }

  private actualizarFiltroTabla(): void {
    this.fuenteDatos.filter = JSON.stringify({
      global: this.filtroGlobal,
      ...this.filtrosPorColumna
    });
  }

  private configurarFiltroPersonalizado(): void {
    this.fuenteDatos.filterPredicate = (fila: any, filtro: string): boolean => {
      const f = JSON.parse(filtro);

      const coincideGlobal = !f.global || this.columnasActivas.some(col =>
        fila[col.clave]?.toString().toLowerCase().includes(f.global)
      );

      const coincideColumnas = Object.keys(this.filtrosPorColumna).every(clave => {
        const busqueda = f[clave];
        return !busqueda || fila[clave]?.toString().toLowerCase().includes(busqueda);
      });

      return coincideGlobal && coincideColumnas;
    };
  }
}
