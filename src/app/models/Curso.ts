export class CursoModel{
    idcurso?:number;
    nombre:string;
    costo:number;
    idperiodo:number|null;
    Periodo?: { idperiodo:number,nombreperiodo: string };

    constructor(){
        this.nombre = '';
        this.costo = 0;
        this.idperiodo = null;
    }
}