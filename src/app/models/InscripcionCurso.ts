import { CursoModel } from "./Curso";
import { EstudianteModel } from "./Estudiantes";

export class InscripcionCursoModel{
    idinscripcion:string;
    fechadeinscripcion:Date;
    montoinscripcion:number;
    estado:string;
    dni:string;
    idcurso:number;
    Estudiante?:EstudianteModel;
    Curso?:CursoModel;
    constructor(codigoInscripcion:string, fecha:Date, estado:string, dni:string, curso:number){
        this.idinscripcion = codigoInscripcion;
        this.fechadeinscripcion = fecha;
        this.montoinscripcion = 0;
        this.estado = estado;
        this.dni = dni,
        this.idcurso = curso

    }
}