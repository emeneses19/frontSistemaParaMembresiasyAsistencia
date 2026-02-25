export class MembresiaModel{
    idmembresia: number;
    dni: string;
    descripcionmembresia:string;
    fechainicio:Date;
    fechalimitedepago?:Date;
    fechavencimientosugerida?:Date;
    montoesperado:number;
    montopagado:number;
    idconfiguracionmembresia:number;
    seleccionada?:any;
    montoAbonar?:number;

    constructor(){
        this.idmembresia = 0;
        this.dni = '';
        this.descripcionmembresia = '';
        this.fechainicio = new Date();
        this.montoesperado = 0;
        this.montopagado = 0;
        this.idconfiguracionmembresia = 0;
    }
}