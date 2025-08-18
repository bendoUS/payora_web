import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
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

  constructor(private authService: AuthService, private router: Router, private api: ApiService, private zone: NgZone) { }

  async onLogin() {
    if (this.email !== "" && this.password !== "") {
      this.errorMessage = ""
      this.isLoading = true
      //this.router.navigate(['/ask']);
      const success: any = await this.authService.login(this.email, this.password);

      if (success) {
        let loggedInUser = await this.logUser(success.user.uid ?? '', success.user.email ?? '');
        console.log('Utilisateur connecté :', loggedInUser);

        localStorage.setItem('userToken', loggedInUser.token);

        let userData: any = await this.getUserInfo(success.user.uid, loggedInUser.token, success.user.displayName ?? '', success.user.email ?? '');
        console.log('Données utilisateur récupérées :', userData);
        //localStorage.setItem('userInfo', JSON.stringify(success.user));

        let successE: any = success.user
        if (!success.displayName) {
          successE.displayName = userData.name;
        }
        localStorage.setItem('userInfo', JSON.stringify(successE));
        if (userData.userType) {
          this.router.navigate(['/dashboard']);
        }
        else {
          this.router.navigate(['/ask']);
        }

        this.isLoading = false
      } else {
        this.errorMessage = "Veuillez vérifier votre adresse e-mail. Utilisateur introuvable.";
        this.isLoading = false
      }
    }
    else {
      this.errorMessage = "Veuillez remplir tous les champs"
    }
  }

  loginGoogle() {
    this.authService.loginWithGoogle()
      .then(async result => {
        console.log('Connecté avec Google :', result.user);

        let loggedInUser = await this.logUser(result.user.uid ?? '', result.user.email ?? '');
        console.log('Utilisateur connecté :', loggedInUser);

        localStorage.setItem('userToken', loggedInUser.token);

        let userData: any = await this.getUserInfo(result.user.uid, loggedInUser.token, result.user.displayName ?? '', result.user.email ?? '');
        console.log('Données utilisateur récupérées :', userData);
        localStorage.setItem('userStockData', JSON.stringify(userData))
        localStorage.setItem('userInfo', JSON.stringify(result.user));

        if (userData) {
          if (userData.userType) {
            window.location.href = '/dashboard';
          }
          else {
            window.location.href = '/ask';
          }
        }
      })
      .catch(error => {
        console.log(error)
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
