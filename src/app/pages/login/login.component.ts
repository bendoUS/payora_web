import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../..//services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

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

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const success = this.authService.login(this.email, this.password);
    console.log("Login success:", success);
    if (success) {
      this.router.navigate(['/ask']);
    } else {
      this.errorMessage = "*Email ou mot de passe invalide.";
    }
  }
}
