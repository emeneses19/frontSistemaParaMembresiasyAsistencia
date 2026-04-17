export class SesionModel {
    idsesion: number;
    nombre: string;
    descripcion: string;
    fechasesion: Date;
    habilitado: boolean;
    idgruposmiembro: number;
    constructor() {
        this.idsesion = 0;
        this.nombre = '';
        this.descripcion = '';
        this.fechasesion = new Date();
        this.habilitado = true;
        this.idgruposmiembro = 0;
    }

}