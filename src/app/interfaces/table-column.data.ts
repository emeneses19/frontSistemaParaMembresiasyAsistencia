export interface TableColumn<T = any> {
    clave: keyof T | string;
    etiqueta: string;
    tipo?: 'text' | 'number' | 'date' | 'actions';
    ordenable?: boolean;
    filtrable?: boolean;
    visible?: boolean;
    sumable?: boolean;
}