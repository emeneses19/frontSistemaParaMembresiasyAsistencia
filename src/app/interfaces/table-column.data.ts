export interface TableColumn<T = any> {
    clave: keyof T | string;
    etiqueta: string;
    tipo?: 'text' | 'number' | 'date' | 'actions' | 'currency';
    ordenable?: boolean;
    filtrable?: boolean;
    visible?: boolean;
    sumable?: boolean;
    formatoExportar?: (valor: any, fila?: T) => any;
}