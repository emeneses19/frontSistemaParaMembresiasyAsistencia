export class EstudianteModel {
    dni:string;
    nombres:string;
    apellidos:string;
    fechadenacimiento:Date;
    celular:string;
    correo:string;
    direccion:string;
    estado:string;
    fecharegistro?:Date;
    esmiembro:boolean;
    fechaasignacionmiembro?:Date | null;;
    fechadeultimaactualizacion?:Date | null;
    idgruposmiembro?:number | null;
    idarea?:number | null;
    idcargo?: number | null;
    detalle1?: string | null;
    detalle2?: string | null;

    constructor(){
        this.dni = '';
        this.nombres = '';
        this.apellidos = '';
        this.fechadenacimiento = new Date();
        this.celular = '';
        this.correo = '';
        this.direccion = '';
        this.estado = 'Asistente';
        this.esmiembro = false;

    }

}