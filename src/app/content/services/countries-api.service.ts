import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CountriesApiService {
  constructor(private http: HttpClient) {}

  getCountryByName(name: string): Observable<any> {
    return this.http.get<any>(
      `${environment.countriesApiBase}/name/${name}?fullText=false`
    );
  }

  getFlagUrl(code: string): string {
    return `https://flagpedia.net/data/flags/icon/36x27/${code}.png`;
  }
}
