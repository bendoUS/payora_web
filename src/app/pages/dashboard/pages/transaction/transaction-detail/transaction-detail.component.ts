import { Component } from '@angular/core';
import { Cancel01Icon, AlertDiamondIcon } from '@hugeicons/core-free-icons';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrl: './transaction-detail.component.scss',
    standalone: false
})
export class TransactionDetailComponent {

  Cancel01Icon = Cancel01Icon
  AlertDiamondIcon = AlertDiamondIcon

  constructor(private router: Router) {}
  

  goToPage(page: any) {
    this.router.navigate(['/'+page]);
  }

}
