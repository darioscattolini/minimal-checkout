import { Component, OnInit } from '@angular/core';
import { 
  AbstractControl, FormControl, ValidatorFn, Validators 
} from '@angular/forms';
import { number, expirationDate } from 'card-validator';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryData } from 'src/models/models';

type Field = 
  | 'cardName' 
  | 'cardNumber' 
  | 'country'
  | 'cvv' 
  | 'email'
  | 'expirationDate';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {
  public cardName = new FormControl('', [Validators.required]);

  public cardNumber = new FormControl('', [
    Validators.required, this.getCardNumberValidator()
  ]);

  public countries?: CountryData[];
  
  public country = new FormControl('', [Validators.required]);

  public cvv = new FormControl('', [Validators.required]);

  public get cvvLabel() {
    const label = number(this.cardNumber.value).card?.code.name;
    
    return label ? label : 'CVV';
  }

  public email = new FormControl('', [
    Validators.required, Validators.email
  ]);

  public expirationDate = new FormControl('', [Validators.required]);

  constructor(
    private countriesService: CountriesService
  ) { }

  public getErrorMessage(error: Field): string {
    switch(error) {
      case 'cardName':
        return this.getCardNameError();
      case 'cardNumber':
        return this.getCardNumberError();
      case 'country':
        return this.getCountryError();
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
    const country = this.country.value;
    const email = this.email.value;   
    const {
      year: expirationYear, 
      month: expirationMonth
    } = expirationDate(this.expirationDate.value);
    
    return {
      cardName, cardNumber, cvv, country, email, expirationYear, expirationMonth
    }
  }

  public ngOnInit() {
    this.getCountries();
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

  private getCountries() {
    this.countriesService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  private getCountryError() {
    return this.country.hasError('required') 
      ? 'Required field' 
      : '';
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
