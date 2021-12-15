import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { langStorage } from './lang_storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [langStorage],
})
export class HeaderComponent implements OnInit {
  enLang: boolean = true;
  kaLang: boolean = false;

  constructor(
    private translateService: TranslateService,
    private storage: langStorage,
    private router: Router,
    private auth: AuthService
  ) {}
  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }
  ngOnInit() {
    let savedLang = this.storage.getLang();
    if (savedLang) {
      this.translateService.use(savedLang);
    }

    switch (savedLang) {
      case 'ka':
        this.enLang = true;
        this.kaLang = false;
        break;
      case 'en':
        this.kaLang = true;
        this.enLang = false;
        break;
      default:
        break;
    }
  }

  changeLang(lang: string) {
    this.storage.setLang(lang);

    if (lang === 'ka') {
      this.enLang = true;
      this.kaLang = false;
    } else {
      this.kaLang = true;
      this.enLang = false;
    }
    this.translateService.use(lang);
  }
  goTLogIn() {
    this.router.navigate(['sign-in']);
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['sign-in']);
    });
  }

  goToLogOut() {
    this.router.navigate(['sign-up']);
  }
}
