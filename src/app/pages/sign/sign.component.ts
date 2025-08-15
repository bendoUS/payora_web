import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../..//services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})
export class SignComponent {

  email = '';
  password = '';
  name = '';
  password_confirm = '';
  errorMessage = '';

  isLoading: boolean = false;

  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: false
  }

  data: any;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private api: ApiService) { }

  async createAccount() {
    this.isLoading = true
    console.log("Creating account with email:", this.email, "and password")
    const success = await this.authService.createUser(this.email, this.password);
    console.log("Login success:", success);
    if (success !== 'error') {
      //this.router.navigate(['/ask']);
      let loggedInUser = await this.logUser(success.uid ?? '', success.email ?? '');
      console.log('Utilisateur connecté :', loggedInUser);
      localStorage.setItem('userToken', loggedInUser.token);

      let userData: any = await this.getUserInfo(success.uid, loggedInUser.token, this.name, success.email ?? '');
      console.log('Données utilisateur récupérées :', userData);

      let successE: any = success
      
      if(!success.displayName) {
        successE.displayName = this.name;
      }

      localStorage.setItem('userInfo', JSON.stringify(successE));

      if (userData) {
        if (userData.userType) {
          window.location.href = '/dashboard';
        }
        else {
          window.location.href = '/ask';
        }
      }
      this.isLoading = false
    } else {
      this.errorMessage = "Cette adresse e-mail existe déjà.";
      this.isLoading = false
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // millisecondes
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }

  logUser(uid: string, email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.postData('login', { uid, email }).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          console.error('Erreur API', err);
          reject(err);
        }
      });
    });
  }

  getUserInfo(uid: string, token: string, name: string, email: string): Promise<any> {
    console.log('Récupération des données utilisateur pour UID:', uid, 'avec token:', token);
    return new Promise((resolve, reject) => {
      this.api.getData('getUserData', { uid, name, email }, token).subscribe({
        next: (res) => {
          this.data = res;
          console.log('Données API', this.data);
          resolve(this.data);
        },
        error: (err) => {
          console.error('Erreur API', err);
          reject(err);
        }
      });
    });
  }

}
