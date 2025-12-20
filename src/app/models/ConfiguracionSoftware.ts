export class ConfiguracionMembresiaModel{
idconfiguracionmembresia!:number;
descripcion:string;
montoparamembresia:number;
frecuenciamesesrenovacion:number;
cantidaddediasparapagar:number;
activo:boolean;
constructor(descripcion:string, monto:number, frecuencia:number,plazo:number, estado:boolean){
this.descripcion = descripcion;
this.montoparamembresia = monto;
this.frecuenciamesesrenovacion = frecuencia;
this.cantidaddediasparapagar = plazo;
this.activo = estado;
}
}