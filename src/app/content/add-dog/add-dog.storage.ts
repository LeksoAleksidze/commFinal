import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class AddDogStorage {
  lastThreeSearches: any[] = [];

  constructor(private storage: StorageService) {}

  addToLastSearches(name: any) {
    if (this.lastThreeSearches.length < 3) {
      this.lastThreeSearches = [name, ...this.lastThreeSearches];

      this.storage.set<any[]>('lastThreeSearches', this.lastThreeSearches);
      return;
    }

    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(0, 2)];
    this.storage.set<any[]>('lastThreeSearches', this.lastThreeSearches);
  }

  restoreState() {
    const lastThreeSearches = this.storage.get<string[]>('lastThreeSearches');
    if (lastThreeSearches && lastThreeSearches.length > 0) {
      this.lastThreeSearches = lastThreeSearches;
    }
  }
}
