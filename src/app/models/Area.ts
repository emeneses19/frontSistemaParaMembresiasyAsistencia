export class AreaModel{
    public idarea?: number;
    public nombrearea:string;
    public descripcion?: string;

    constructor(nombrearea:string){
        this.nombrearea = nombrearea;
        this.descripcion = ''
    }
}