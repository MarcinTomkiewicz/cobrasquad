import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {}

  login(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password); // returns a Promise of UserCredential
  }

  getUser(): Observable<IUser | null | undefined> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  };

  logout(): Promise<void> {
    return this.afAuth.signOut(); // returns a Promise<void>
  };
}
