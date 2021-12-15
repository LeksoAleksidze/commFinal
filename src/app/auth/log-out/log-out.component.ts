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
  constructor(
    private auth: AuthService,
    private router: Router,
    private loading: LoadingService
  ) {}

  ngOnInit() {}

  register(form: NgForm) {
    if (!form.valid) {
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
