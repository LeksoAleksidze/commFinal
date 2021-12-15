import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  addSuccess: boolean = false;
  textTitle: string = '';
  formGroup!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private loading: LoadingService
  ) {}

  ngOnInit() {}
  closePopUp(e: boolean) {
    this.addSuccess = false;
  }

  signIn({ email, password }: SignInForm) {
    if (!email || !password) {
      return;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      this.addSuccess = true;
      const lang = localStorage.getItem('lang');
      if (lang === 'ka') {
        this.textTitle = 'შეიყვანეთ სწორი მეილი';
      } else {
        this.textTitle = 'Enter the correct email';
      }

      return;
    }
    this.loading.start();
    from(this.authService.signIn({ email, password }))
      .pipe(finalize(() => this.loading.stop()))
      .subscribe(() => {
        this.router.navigate(['content']);
      });
  }
}

export interface SignInForm {
  email: string;
  password: string;
}
