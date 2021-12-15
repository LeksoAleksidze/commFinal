import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '.';

@Injectable({
  providedIn: 'root',
})
export class FireApiService {
  constructor(private store: AngularFirestore, private auth: AuthService) {}

  addMovie(body: any) {
    return from(this.store.collection('content').add(body));
  }

  getMovies(): Observable<any[]> {
    return this.store
      .collection<any>('content', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .get()
      .pipe(
        map((res) => res.docs.map<any>((d) => ({ ...d.data(), id: d.id })))
      );
  }

  getMovie(id: string): Observable<any | undefined> {
    return this.store
      .collection<any>('content', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .doc(id)
      .get()
      .pipe(map((res) => res.data()));
  }
}
