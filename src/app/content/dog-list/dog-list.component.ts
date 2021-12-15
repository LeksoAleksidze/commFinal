import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services';
import { FireApiService } from 'src/app/services/fire-api.service';
import { addDogApiServices } from '../services';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss'],
})
export class DogListComponent implements OnInit {
  movies$: Observable<any[]> | undefined;

  constructor(
    private loadingService: LoadingService,
    private fireApiService: FireApiService,
    private movieApiService: addDogApiServices
  ) {}

  private mapMovieData(data: any[]) {
    return data.map((d) =>
      this.movieApiService.getDog(d.id).pipe(
        map<any, any>((movie) => ({
          data: d,
        }))
      )
    );
  }

  ngOnInit() {
    this.loadingService.start();
    this.movies$ = this.fireApiService.getMovies().pipe(
      switchMap((data) => forkJoin(this.mapMovieData(data))),
      finalize(() => this.loadingService.stop())
    );
  }
}
