import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { CountryData, ApiCountryData } from 'src/models/models';

type DataTransformer = (countries: ApiCountryData[]) => CountryData[];

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private countries?: Observable<CountryData[]>;

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<CountryData[]> {
    if (this.countries) {
      return this.countries;
    } else {
      this.countries = this.http
        .get<ApiCountryData[]>('https://restcountries.com/v3.1/all')
        .pipe(
          map(this.getCountryDataTransformer()),
          shareReplay()
        );
      
      return this.countries;
    }
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
