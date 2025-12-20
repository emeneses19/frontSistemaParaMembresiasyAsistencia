export class MetodoPagoModel {
    idmetodosdepago?:number;
    nombre:string;
    descripcion?:string

    constructor(nombre:string){
         this.nombre = nombre;
         this.descripcion = '';
    }

}