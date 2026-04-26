import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }
  exportToExcel<T>(data: T[], fileName: string): void {  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const objectMaxLength: any[] = [];
    data.forEach(row => {
      Object.entries(row as any).forEach(([key, value], i) => {
        const columnValue = value ? value.toString() : '';
        objectMaxLength[i] = Math.max(objectMaxLength[i] || 0, columnValue.length, key.length);
      });
    });
    worksheet['!cols'] = objectMaxLength.map(w => ({ width: w + 2 }));

    // 3. Crear el libro y guardar
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}
