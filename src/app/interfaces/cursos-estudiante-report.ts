export interface ReportCursosEstudianteData {
    idPeriodo: number;
    nombrePeriodo: string;
    idCurso: number;
    cursoNombre:string;
    costoCurso:number;
    idinscripcion:string;
    fechadeinscripcion:Date;
    dni: string;
    nombresEstudiante:string;
    apellidosEstudiante: string;
    celular:string;
    numeroSeriePagoCurso:string;
    numeroCorrelativoPagoCurso:number;
    fechapago:Date;
    montoTotalPagoCurso:number;
    estato_Pago_Curso:string;

}
