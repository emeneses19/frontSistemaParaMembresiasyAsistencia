export interface PagoCursoData {
    numeroserie: string;
    fechapago: Date | string;
    montototal: number;
    idmetodosdepago: number;
    observaciones: string | null;
    idinscripcion: string;
}