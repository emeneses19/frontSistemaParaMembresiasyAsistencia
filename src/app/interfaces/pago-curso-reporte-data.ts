
export interface ReportePagoCursoData {
    serie: string;
    numerocorrelativo: string;
    fechapago: Date;
    montoTotalPago: number;
    estado: string;
    pagoCodigoMedioDePago: string;
    pagoCursoCodigoInscripcion: string;
    usuarioregistra: string;
    usuariomodifica: string;
    fechadeultimamodificacion: Date;
    observaciones: string | null;
    medioDePagoCodigo: string;
    medioDePagoNombre: string;
    inscripcionCodigo: string;
    dni: string;
    nombres: string;
    apellidos: string;
    cursoCodigo: string;
    cursoNombre: string;
    periodoCodigo: string;
    periodoNombre: string;

}