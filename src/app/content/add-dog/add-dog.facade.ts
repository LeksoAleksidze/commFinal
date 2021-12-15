import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import {
  delay,
  finalize,
  map,
  mergeMap,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { FireApiService } from 'src/app/services/fire-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { addDogApiServices, CountriesApiService } from '../services';
import { AddDogStorage } from './add-dog.storage';

@Injectable()
export class addDogFacade {
  addSuccess: boolean = false;
  constructor(
    private animalApiService: addDogApiServices,
    private loadingService: LoadingService,
    private countryApiService: CountriesApiService,
    private storage: AddDogStorage,
    private fireApiService: FireApiService
  ) {}

  // private mapCountry(country: any) {
  //   const cc = country[0];

  //   return {
  //     name: cc.name?.common,
  //     population: cc.population,
  //     flagUrl: this.countryApiService.getFlagUrl(cc.cca2.toLowerCase()),
  //   };
  // }

  // private getCountries(countries: string[]) {
  //   return forkJoin(
  //     countries.map((c) =>
  //       this.countryApiService
  //         .getCountryByName(c)
  //         .pipe(map<any, any>((c) => this.mapCountry(c)))
  //     )
  //   );
  // }

  get lastThreeSearches(): string[] {
    return this.storage.lastThreeSearches;
  }

  fetchBreeds() {
    this.loadingService.start();
    return this.animalApiService.getAnimalBreeds().pipe(
      map((x) =>
        x.map((breed: any) => {
          return {
            id: breed.id,
            name: breed.name,
          };
        })
      ),
      finalize(() => {
        setTimeout(() => {
          this.loadingService.stop();
        }, 1000);
      })
    );
  }

  getDog(id: string) {
    this.loadingService.start();
    return this.animalApiService.getDog(id).pipe(
      tap((x) => console.log(x)),
      map((x) => {
        return {
          animal: x,
        };
      }),
      // switchMap((dog) => {
      //   return this.getCountries([dog[0].breeds[0].country_code]).pipe(
      //     map((x) => {
      //       return {
      //         flag: x,
      //         animal: dog,
      //       };
      //     })
      //   );
      // }),
      finalize(() => {
        setTimeout(() => {
          this.loadingService.stop();
        }, 1000);
      })
    );
  }
  addToLastSearches(key: any) {
    this.storage.addToLastSearches(key);
  }

  restoreState() {
    this.storage.restoreState();
  }

  submit(body: any) {
    this.fireApiService.addMovie(body);
  }

  get statusAdd() {
    return this.addSuccess;
  }
}
