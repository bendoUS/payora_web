import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HugeiconsIconComponent } from "@hugeicons/angular";
import { Tick02Icon } from '@hugeicons/core-free-icons';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-ask',
  imports: [CommonModule, HugeiconsIconComponent],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.scss',
  standalone: true
})
export class AskComponent {
  Tick02Icon = Tick02Icon;


  isClientSelected: boolean = false;
  isPrestaSelected: boolean = true;

  constructor(private router: Router, private api: ApiService) { }

  goToDashboard() {
    // Logic to navigate to the dashboard
    this.router.navigate(['/dashboard']);
    console.log('Navigating to dashboard...');
  }

  selectType(type: string) {
    if (type === 'client') {
      this.isClientSelected = true;
      this.isPrestaSelected = false;
    } else if (type === 'presta') {
      this.isClientSelected = false;
      this.isPrestaSelected = true;
    }
  }

  async updateUserType() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo.uid) {
      this.updateData(userInfo.uid, this.isClientSelected ? 'client' : 'presta');
      this.router.navigate(['/dashboard']);
    }
    else {
      alert('Utilisateur non connecté ou UID manquant.');
    }
  }

  updateData(uid: string, userType: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getData('setUserType', { uid, userType }).subscribe({
        next: (res) => {
          console.log(res)
          resolve(res);
        },
        error: (err) => {
          console.error('Erreur API', err);
          reject(err);
        }
      });
    });
  }



}
