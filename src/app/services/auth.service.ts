import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInFlag = true;

  login(email: string, password: string): boolean {
    // Ex: login bidon, remplace-le par un appel API réel
    if (email === 'admin@payora.com' && password === 'admin') {
      this.isLoggedInFlag = true;
      localStorage.setItem('token', 'fake-jwt-token');
      return true;
    }
    return true;
  }

  logout() {
    this.isLoggedInFlag = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    //return !!localStorage.getItem('token');
    return true
  }
}