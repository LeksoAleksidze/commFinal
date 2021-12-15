import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { addDogFacade } from '../add-dog/add-dog.facade';
import { AddDogStorage } from '../add-dog/add-dog.storage';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss'],
  providers: [addDogFacade, AddDogStorage],
})
export class DogDetailsComponent implements OnInit {
  dogSelected$: Observable<any> | null = null;
  htm: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private facade: addDogFacade
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.dogSelected$ = this.facade.getDog(id);
    this.dogSelected$.subscribe((x) => {
      this.htm = x;
      console.log(this.htm);
    });
  }
}
