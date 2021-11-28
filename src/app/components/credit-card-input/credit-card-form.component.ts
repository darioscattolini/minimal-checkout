import { Component, ViewChild } from '@angular/core';
import { 
  AbstractControl, FormControl, ValidatorFn, Validators 
} from '@angular/forms';
import { number, expirationDate } from 'card-validator';
import { 
  CountrySelectorComponent 
} from '../country-selector/country-selector.component';

type Field = 
  | 'cardName' 
  | 'cardNumber' 
  | 'cvv' 
  | 'email'
  | 'expirationDate';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent {
  public cardName = new FormControl('', [Validators.required]);

  public cardNumber = new FormControl('', [
    Validators.required, this.getCardNumberValidator()
  ]);

  public cvv = new FormControl('', [Validators.required]);

  public get cvvLabel(): string {
    const label = number(this.cardNumber.value).card?.code.name;
    
    return label ? label : 'CVV';
  }

  public email = new FormControl('', [
    Validators.required, Validators.email
  ]);

  public expirationDate = new FormControl('', [Validators.required]);

  public get isValid(): boolean {
    const controls = [
      this.cardName, 
      this.cardNumber, 
      this.country ? this.country.formControl : { valid: false },
      this.cvv, 
      this.email, 
      this.expirationDate
    ];

    return controls.every(control => control.valid);
  }

  public zipCode = new FormControl('');

  @ViewChild('country') private country!: CountrySelectorComponent;

  public getErrorMessage(error: Field): string {
    switch(error) {
      case 'cardName':
        return this.getCardNameError();
      case 'cardNumber':
        return this.getCardNumberError();
      case 'cvv':
        return this.getCvvError();
      case 'email': 
        return this.getEmailError();
      case 'expirationDate': 
        return this.getExpirationDateError();
    }
  }

  public getValues() {
    const cardName = this.cardName.value;
    const cardNumber = this.cardNumber.value;
    const cvv = this.cvv.value;
    const country = this.country.formControl.value;
    const email = this.email.value;
    const {
      year: expirationYear, 
      month: expirationMonth
    } = expirationDate(this.expirationDate.value, 70);
    const zipCode = this.zipCode.value;
    
    return {
      cardName, 
      cardNumber, 
      cvv, 
      country, 
      email, 
      expirationYear, 
      expirationMonth,
      zipCode
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

  private getEmailError(): string {
    if (this.email.hasError('required')) {
      return 'Required field';
    }

    return this.email.hasError('email') 
      ? 'You must enter a valid email address' 
      : '';
  }

  private getExpirationDateError(): string {
    return this.expirationDate.hasError('required') 
      ? 'Required field'
      : '';
  }
}
