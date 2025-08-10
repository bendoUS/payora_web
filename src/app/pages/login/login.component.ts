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
    //this.router.navigate(['/ask']);
    const success = this.authService.login(this.email, this.password);
    console.log("Login success:", success);
    if (await success) {
      this.router.navigate(['/ask']);
    } else {
      this.errorMessage = "*Email ou mot de passe invalide.";
    }
  }

  loginGoogle() {
    this.authService.loginWithGoogle()
      .then(async result => {
        console.log('Connecté avec Google :', result.user);
        localStorage.setItem('userInfo', JSON.stringify(result.user));
        let userData: any = await this.getUserInfo(result.user.uid);
        if (userData) {
          if (userData.userType !== null) {
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

  getUserInfo(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getData('getUserData', { uid }).subscribe({
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
