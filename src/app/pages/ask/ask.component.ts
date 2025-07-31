import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ask',
    imports: [],
    templateUrl: './ask.component.html',
    styleUrl: './ask.component.scss'
})
export class AskComponent {
  
  constructor(private router: Router) {}

  goToDashboard() {
    // Logic to navigate to the dashboard
    this.router.navigate(['/dashboard']);
    console.log('Navigating to dashboard...');
  }
}
