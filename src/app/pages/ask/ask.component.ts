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

  isLoading: boolean = false;

  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userToken: string = localStorage.getItem('userToken') || '';

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
  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    console.log('User Info:', userInfo);
  }

  async updateUserType() {
    this.isLoading = true
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo.uid) {
      let updUserDt = await this.updateData(userInfo.uid, this.isClientSelected ? 'client' : 'presta');
      console.log(updUserDt)
      if(updUserDt.userType){
        this.router.navigate(['/dashboard']);
      }
      this.isLoading = false
    }
    else {
      alert('Utilisateur non connecté ou UID manquant.');
      this.isLoading = false
    }
  }

  updateData(uid: string, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getData('setUserType', { uid, type }, this.userToken).subscribe({
        next: (res) => {
          console.log(res)
          resolve(res);
        },
        error: (err) => {
          console.error('Erreur API', err);
          this.router.navigate(['/login']);
          reject(err);
        }
      });
    });
  }



}
