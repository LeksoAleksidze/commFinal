import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class addDogApiServices {
  constructor(private http: HttpClient) {}

  getAnimalBreeds() {
    return this.http.get<any>(environment.animalBreeds);
  }

  getDog(id: string) {
    return this.http.get<any>(`${environment.animalDogApi}&breed_id=${id}`);
  }
}
