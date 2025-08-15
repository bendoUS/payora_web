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

  async login(email: string, password: string) {
    try{ 
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential
    }
    catch(e){
      return false
    }
    
  }

  async createUser(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log("✅ Compte créé :", userCredential.user.uid);
      console.log("📧 Email :", userCredential.user.email);
      return userCredential.user;
    } catch (error) {
      return 'error'
    }
  }


  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  logout() {
    ///this.isLoggedInFlag = false;
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('userInfo');
    }
    return false;
  }
}