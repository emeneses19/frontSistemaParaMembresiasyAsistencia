import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export class DateValidators {
    static fechasOrdenadas(control: AbstractControl): ValidationErrors | null {
        const inicio = control.get('fechaInicio')?.value;
        const fin = control.get('fechaInicio')?.value;

        if (inicio && fin) {
            if (fin && inicio > fin) {
                return { fechaInvalida: true };
            }

        }
        return null;



    }
}
