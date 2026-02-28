export interface DetalleMembresia {
    idmembresia: number;
    descripcion_membresia: string;
    montomembresia: number;
}

export interface PagoMembresiaPayload {
    seriecorrelativopagomembresia: string;
    fecha: Date | string; // Date para el formulario, string para el envío al backend
    montotal: number;
    idmetodosdepago: number;
    observacion: string | null;
    detallesMembresias: DetalleMembresia[];
}