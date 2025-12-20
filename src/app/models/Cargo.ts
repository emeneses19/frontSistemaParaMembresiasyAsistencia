export class CargoModel {
    idcargo?: number;
    nombrecargo:string;
    descripcion?:string;
    constructor(nombre:string){
        this.nombrecargo = nombre;
        this.descripcion ='';
    }
}