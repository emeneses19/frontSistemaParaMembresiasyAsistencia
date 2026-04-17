export interface ReportePagoMembresiaData {
    codigoPago: string;
    serie: string;
    numero: string;
    fecha: Date;
    montotal: number;
    observacion: string | null;
    pagoCodMetoPago: string;
    estado: string;
    usuarioregistra: string;
    usuariomodifica: string;
    fechahoraregistro: Date;
    fechaultimaactualizacion: Date;
    metodoPagoCodigo: string;
    metodoPagoNombre: string;
    metodoPagoDescripcion: string;
    dni: string;
    nombres: string;
    apellidos: string;
    descripcionmembresia: string;
}