export class GrupoMiembroModel {
    idgruposmiembro?:number;
    nombredelgrupo:string;
    fechacreacion:Date;

    constructor(nombre:string, fecha:Date){
        this.nombredelgrupo = nombre;
        this.fechacreacion = fecha
    }
}