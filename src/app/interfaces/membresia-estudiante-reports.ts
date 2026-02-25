import { MembresiaModel } from "../models/Membresia";

export interface ReporteMembresiaEstudianteData{
    membresias:MembresiaModel[];
    deudaTotal:number;
}