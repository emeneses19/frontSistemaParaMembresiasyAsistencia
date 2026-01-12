import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Validadores{
    static sinEspacios(control:AbstractControl):ValidationErrors | null{
        const esSoloEspacio = (control.value || '').trim().length === 0;
        const esValido = !esSoloEspacio;
        return esValido ? null:{'soloEspacios':true}
    }
}