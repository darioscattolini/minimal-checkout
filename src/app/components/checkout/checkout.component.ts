import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountriesService } from 'src/app/services/countries.service';
import { ArticleCheckoutData, CountryData } from 'src/models/models';

type Field = 'country' | 'email';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public countries?: CountryData[];
  
  public country = new FormControl('', [Validators.required]);

  public email = new FormControl('', [
    Validators.required, Validators.email
  ]);
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public article: ArticleCheckoutData,
    private countriesService: CountriesService
  ) { }

  public getErrorMessage(error: Field) {
    if (error === 'email') {
      if (this.email.hasError('required')) {
        return 'Required field';
      }
  
      return this.email.hasError('email') 
        ? 'You must enter a valid email address' 
        : '';
    } else {
      return this.country.hasError('required') 
        ? 'Required field' 
        : '';
    }
  }

  public ngOnInit() {
    this.getCountries();
  }
  
  public pay(method: 'apple-pay' | 'card') {

  }

  private getCountries() {
    this.countriesService.getCountries()
      .subscribe(countries => this.countries = countries);
  }
}
