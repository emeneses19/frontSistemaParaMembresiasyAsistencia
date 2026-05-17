export interface ReporteDetallePagoMembresiaData {
    pagoCodigo: string;
    pagoCodMembresia: string;
    detalleCodPago: string;
    pagoDescripcion: string;
    montomembresia: string;
    detalleadicional: string | null;
    fecha: string;
    serie: string;
    numeroDoc: string;
    estado: string;
    usuarioregistra: string;
    usuariomodifica: string | null ;
    membresiaCod: string;
    dni: string;
    membresiaDesc: string;
    estudianteDNI: string;
    nombres: string;
    apellidos: string;
}