import { AbstractControl, FormGroup } from "@angular/forms";
export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  console.log(controlName,matchingControlName)
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      console.log(control,matchingControlName)
      if (
        matchingControl.errors &&
        !matchingControl.errors["confirmPasswordValidator"]
      ) {
        console.log('123')
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        console.log('456')
        matchingControl.setErrors(null);
      }
    };
  }

