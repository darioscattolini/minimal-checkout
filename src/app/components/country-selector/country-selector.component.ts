import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { map, shareReplay } from 'rxjs';
import { ApiCountryData, CountryData } from 'src/app/models/models';

type DataTransformer = (countries: ApiCountryData[]) => CountryData[];

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit {

  public countries?: CountryData[];
  
  public formControl = new FormControl('');

  public get required() { 
    return this._required; 
  }
  
  @Input() public set required(value: boolean) {
    if (value) this.formControl.addValidators(Validators.required);
    else this.formControl.removeValidators(Validators.required);
    
    this.formControl.updateValueAndValidity();
  };
  
  private _required = false;

  constructor(private http: HttpClient) { }

  public getErrorMessage(): string {
    return this.formControl.hasError('required') 
      ? 'Required field' 
      : '';
  }

  public ngOnInit() {
    this.getCountries();
  }

  private getCountries() {
    this.http
      .get<ApiCountryData[]>('https://restcountries.com/v3.1/all')
      .pipe(
        map(this.getCountryDataTransformer()),
        shareReplay()
      )
      .subscribe(countries => this.countries = countries);      
  }

  private getCountryDataTransformer(): DataTransformer {
    return countries => countries
      .map(country => {
        return {
          name: country.name.common,
          code: country.cca3
        }
      })
      .sort(
        (country1, country2) => country1.name
          .localeCompare(country2.name, 'en', { sensitivity: 'base' })
      );
  }
}
