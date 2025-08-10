import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInFlag = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private auth: Auth) { }

  /*login(email: string, password: string): boolean {
    // Ex: login bidon, remplace-le par un appel API réel
    if (email === 'admin@payora.com' && password === 'admin') {
      this.isLoggedInFlag = true;
      localStorage.setItem('token', 'fake-jwt-token');
      return true;
    }
    return true;
  }*/

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  logout() {
    ///this.isLoggedInFlag = false;
    localStorage.removeItem('userInfo');
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('userInfo');
    }
    return false;
  }
}