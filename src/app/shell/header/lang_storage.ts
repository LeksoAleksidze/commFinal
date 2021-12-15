import { Injectable } from '@angular/core';

@Injectable()
export class langStorage {
  constructor() {}

  getLang(): string | null {
    return localStorage.getItem('lang');
  }

  setLang(lang: string): void {
    localStorage.setItem('lang', lang);
  }
}
