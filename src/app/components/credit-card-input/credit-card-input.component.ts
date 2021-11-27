import { Component } from '@angular/core';
import { 
  AbstractControl, 
  FormControl, 
  ValidatorFn, 
  Validators 
} from '@angular/forms';
import { number } from 'card-validator';

type Field = 'cardName' | 'cardNumber' | 'cvv' | 'expirationDate';

@Component({
  selector: 'app-credit-card-input',
  templateUrl: './credit-card-input.component.html',
  styleUrls: ['./credit-card-input.component.scss']
})
export class CreditCardInputComponent {
  public cardName = new FormControl('', [Validators.required]);

  public cardNumber = new FormControl('', [
    Validators.required, this.getCardNumberValidator()
  ]);

  public cvv = new FormControl('', [Validators.required]);

  public get cvvLabel() {
    const label = number(this.cardNumber.value).card?.code.name;
    
    return label ? label : 'CVV';
  }

  public expirationDate = new FormControl('', [Validators.required]);

  public getErrorMessage(error: Field): string {
    switch(error) {
      case 'cardName':
        return this.getCardNameError();
      case 'cardNumber':
        return this.getCardNumberError();
      case 'cvv':
        return this.getCvvError();
      case 'expirationDate': 
        return this.getExpirationDateError();
    }
  }

  private getCardNameError(): string {
    return this.cardName.hasError('required') 
      ? 'Required field'
      : '';
  }

  private getCardNumberError(): string {
    if (this.cardNumber.hasError('required')) {
      return 'Required field';
    }

    return this.cardNumber.hasError('cardNumber') 
      ? 'You must enter a valid card number' 
      : '';
  }

  private getCardNumberValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const input = control.value;
      const isValid = number(input).isValid;
      
      return isValid ? null : { cardNumber: { value: input } };
    };
  }

  private getCvvError(): string {
    return this.cvv.hasError('required') 
      ? 'Required field'
      : '';
  }

  private getExpirationDateError(): string {
    return this.expirationDate.hasError('required') 
      ? 'Required field'
      : '';
  }
}
