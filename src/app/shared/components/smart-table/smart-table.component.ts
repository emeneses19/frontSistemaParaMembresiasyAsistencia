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
    MatInputModule
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

  //para filtro por columna
  filtrosPorColumna: { [key: string]: string } = {};
  filtroGlobal: string = '';
  ngAfterViewInit(): void {
    if (this.mostrarPaginacion && this.paginador) {
      this.fuenteDatos.paginator = this.paginador;
    }

    if (this.ordenamiento) {
      this.fuenteDatos.sort = this.ordenamiento;
    }
  }


  ngOnInit(): void {
    this.inicializarTabla();


  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] && this.fuenteDatos) {
      this.fuenteDatos.data = this.datos;
    }

    if (changes['columnas']) {
      this.actualizarColumnasVisibles();
    }
  }

  //footer de las columnas
  obtenerTotal(columnaClave: string): number {
    if (!this.fuenteDatos) return 0;
    return this.fuenteDatos.filteredData.map((fila: any) => Number(fila[columnaClave]) || 0).reduce((acumulador, valor) => {
      return acumulador + valor
    }, 0);
  }



  get columnasFooter(): string[] {
    return this.columnasVisibles.map(c => 'footer_' + c);
  }


  //filtro por columna
  get columnasFiltro(): string[] {
    return this.columnasVisibles.map(c => 'filtro_' + c);
  }


  aplicarFiltroColumna(clave: string, evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.filtrosPorColumna[clave] = valor.trim().toLowerCase();

    this.actualizarFiltroTabla();
  }
  aplicarFiltroGlobal(evento: Event): void {

    const valorFiltro = (evento.target as HTMLInputElement).value;
    this.filtroGlobal = valorFiltro.trim().toLowerCase();
    this.actualizarFiltroTabla();

  }

  private actualizarFiltroTabla(): void {

    const filtroCombinado = {
      global: this.filtroGlobal,
      ...this.filtrosPorColumna
    };

    this.fuenteDatos.filter = JSON.stringify(filtroCombinado);
  }

  private inicializarTabla(): void {
    this.fuenteDatos = new MatTableDataSource(this.datos);
    this.actualizarColumnasVisibles();
    this.columnasVisibles = this.columnas.filter(column => column.visible !== false).map(col => {
      return col.clave as string;
    });
    this.configurarFiltroPersonalizado();

  }
  private configurarFiltroPersonalizado(): void {
    this.fuenteDatos.filterPredicate = (fila: any, filtro: string): boolean => {

      const filtros = filtro ? JSON.parse(filtro) : { global: '', filtrosColumna: {} };

      const textoGlobal = (filtros.global || '').toLowerCase();

      const coincideGlobal = !textoGlobal || this.columnas
        .filter(col => col.visible !== false)
        .some(col => {

          const valor = fila[col.clave];
          if (valor == null) return false;

          return valor.toString().toLowerCase().includes(textoGlobal);
        });

      const coincideColumnas = this.columnas
        .filter(col => col.visible !== false)
        .every(col => {

          const valor = fila[col.clave];
          if (valor == null) return true;

          const texto = valor.toString().toLowerCase();
          const filtroColumna = filtros[col.clave];

          if (!filtroColumna) return true;

          return texto.includes(filtroColumna);
        });

      return coincideGlobal && coincideColumnas;
    };
  }

  private actualizarColumnasVisibles(): void {
    this.columnasVisibles = [...this.columnas
      .filter(col => col.visible !== false)
      .map(col => col.clave as string)];
  }

  cambiarVisibilidadColumna(columna: TableColumn<T>): void {
    columna.visible = !columna.visible;
    if (!columna.visible) {
      delete this.filtrosPorColumna[columna.clave as string];
      this.actualizarFiltroTabla();

      this.actualizarColumnasVisibles();
    }
  }
}
