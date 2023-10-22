import { Directive, DoCheck, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { AbstractControl, ValidationErrors,  ValidatorFn, Validators } from '@angular/forms';

const _clearValidators = AbstractControl.prototype.clearValidators;
AbstractControl.prototype.clearValidators = function(){
  (this as any).isRequired = false;
  _clearValidators.call(this);
}

const _setValidators = AbstractControl.prototype.setValidators;
AbstractControl.prototype.setValidators = function(newValidator: ValidatorFn | ValidatorFn[] | null): void {
  (this as any).isRequired = false;
  _setValidators.call(this, newValidator);
}

export class MatValidators{
  static required(control: AbstractControl): ValidationErrors | null {
    (control as any).isRequired = true;
    return  Validators.required(control);
  }
} 

@Directive({ selector: '[matInput][formControl]:not([required]), [matInput][formControlName]:not([required])' })
export class MatInputRequired implements DoCheck {
  constructor(private readonly input: MatInput) { }

  ngDoCheck() {
    const isRequired = (this.input.ngControl?.control as any)?.isRequired ?? false;
    if(isRequired !== this.input.required){
      this.input.required = isRequired;
      this.input.ngOnChanges();
    }
  }
}

@Directive({ selector: 'mat-select[formControl]:not([required]), mat-select[formControlName]:not([required])' })
export class MatSelectRequired implements DoCheck {
  constructor(private readonly input: MatSelect) { }

  ngDoCheck() {
    const isRequired = (this.input.ngControl?.control as any)?.isRequired ?? false;
    if(isRequired !== this.input.required){
      this.input.required = isRequired;
    }
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MatSelectRequired,
    MatInputRequired
  ],
  exports: [
    MatSelectRequired,
    MatInputRequired
  ]
})
export class MatFormFieldRequiredModule { }
