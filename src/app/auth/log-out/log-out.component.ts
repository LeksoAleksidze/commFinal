import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
  textTitle: string = '';
  addSuccess = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private loading: LoadingService
  ) {}

  ngOnInit() {}
  closePopUp(e: boolean) {
    this.addSuccess = false;
  }

  register(form: NgForm) {
    if (!form.valid) {
      return;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!form.value.email.match(mailformat)) {
      this.addSuccess = true;
      const lang = localStorage.getItem('lang');
      if (lang === 'ka') {
        this.textTitle = 'შეიყვანეთ სწორი მეილი';
      } else {
        this.textTitle = 'Enter the correct email';
      }

      return;
    }

    if (form.value.password.length < 6) {
      this.addSuccess = true;
      const lang = localStorage.getItem('lang');
      if (lang === 'ka') {
        this.textTitle = 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან';
      } else {
        this.textTitle = 'The password must be at least 6 characters long';
      }

      return;
    }

    this.loading.start();

    from(this.auth.signUp(form.value))
      .pipe(finalize(() => this.loading.stop()))
      .subscribe(() => this.router.navigate(['content']));
  }
}

export interface SignUpForm {
  email: string;
  password: string;
}
