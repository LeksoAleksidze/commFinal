import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { addDogFacade } from './add-dog.facade';
import { AddDogStorage } from './add-dog.storage';
import { RATINGS } from '../content.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services';
@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrls: ['./add-dog.component.scss'],
  providers: [addDogFacade, AddDogStorage],
})
export class AddDogComponent implements OnInit {
  addSuccess: boolean = false;
  textTitle: string = '';
  searchKey: any;
  breedsOptions$: Observable<any> | null = null;
  dogSelected$: Observable<any> | null = null;

  htmlArray: any[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private facade: addDogFacade,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.breedsOfAnimals();
    this.facade.restoreState();
    this.buildForm();
  }

  ngDoCheck() {
    this.htmlArray = this.facade.lastThreeSearches;
  }

  private buildForm() {
    this.form = this.fb.group({
      review: ['', [Validators.required, Validators.minLength(10)]],
      rating: 1,
    });
  }

  // get lastThreeSearches(): string[] {
  //   return this.facade.lastThreeSearches;
  // }

  get ratings(): number[] {
    return RATINGS;
  }

  breedsOfAnimals() {
    this.breedsOptions$ = this.facade.fetchBreeds();
  }

  searchDog(id: number) {
    if (id) {
      this.searchKey = id;
    }
    if (!this.searchKey) {
      const lang = localStorage.getItem('lang');
      if (lang === 'ka') {
        this.textTitle = 'გთხოვთ,აიერჩიეთ ძაღლის ჯიში';
      } else {
        this.textTitle = 'Please Choose';
      }

      this.addSuccess = true;
      return;
    }

    this.dogSelected$ = this.facade.getDog(this.searchKey);
    this.dogSelected$.subscribe((x) => {
      const pattern = {
        name: x.animal[0].breeds[0].name,
        id: x.animal[0].breeds[0].id,
      };
      this.facade.addToLastSearches(pattern);
    });
    this.searchKey = '';
  }

  submit(selected: any) {
    if (this.form.invalid) {
      const lang = localStorage.getItem('lang');
      if (lang === 'ka') {
        this.textTitle =
          'განხილვა სავალდებულოა, მინიმალური სიმბოლოების ოდენობა არის 10';
      } else {
        this.textTitle =
          'Review is mandatory, the minimum number of characters is 10';
      }

      this.addSuccess = true;
      return;
    }

    const value = this.form.value;

    const body: sendData = {
      imdbId: selected.animal[0].breeds[0].id,
      name: selected.animal[0].breeds[0].name,
      url: selected.animal[0]?.url,
      uid: this.auth.userId,
      rating: value.rating,
      review: value.review,
    };
    this.formReset();
    this.facade.submit(body);
    this.addSuccess = true;
    this.dogSelected$ = null;
  }
  private formReset() {
    this.form.reset();
    this.form.get('review')?.setValue('');
    this.form.get('rating')?.setValue(1);
  }

  closePopUp(e: boolean) {
    if (e) {
      const lang = localStorage.getItem('lang');
      if (lang === 'ka') {
        this.textTitle = 'წარმატებით დაემატა';
      } else {
        this.textTitle = 'Successfully added';
      }

      this.addSuccess = false;
    }
  }
}

interface sendData {
  imdbId: string;
  name: string;
  url: string;
  uid: string | null | undefined;
  rating: string;
  review: string;
}
