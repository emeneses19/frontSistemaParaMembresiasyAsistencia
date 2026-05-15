import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel<T>(
    data: T[],
    fileName: string,
    columns?: {
      key: string,
      header: string,
      formatoExportar?: (valor: any, fila?: any) => any
    }[]
  ): void {

    let dataExportar: any[] = [];

    if (columns && columns.length > 0) {

      dataExportar = data.map(row => {

        const nuevoObjeto: any = {};

        columns.forEach(col => {

          const valor = (row as any)[col.key];

          nuevoObjeto[col.header] = col.formatoExportar
            ? col.formatoExportar(valor, row)
            : valor;

        });

        return nuevoObjeto;

      });

    } else {

      dataExportar = data;

    }

    const worksheet = XLSX.utils.json_to_sheet(dataExportar);

    const objectMaxLength: number[] = [];

    dataExportar.forEach(row => {

      Object.entries(row).forEach(([key, value], i) => {

        const columnValue = value ? value.toString() : '';

        objectMaxLength[i] = Math.max(
          objectMaxLength[i] || 0,
          columnValue.length,
          key.length
        );

      });

    });

    worksheet['!cols'] = objectMaxLength.map(w => ({
      width: w + 2
    }));

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}
