import { Component } from '@angular/core';
import { Cancel01Icon, AlertDiamondIcon } from '@hugeicons/core-free-icons';
import { TransactionService } from '../../../../../services/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrl: './transaction-detail.component.scss',
    standalone: false
})
export class TransactionDetailComponent {

  Cancel01Icon = Cancel01Icon
  AlertDiamondIcon = AlertDiamondIcon

  transaction: any;
  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');

  constructor(private router: Router, private transactionService: TransactionService, private route: ActivatedRoute) {}

  async ngOnInit() {
    //console.log(this.userInfo, this.route.snapshot.paramMap.get('id'))
    // 1. Essaye de charger depuis le service/localStorage
    this.transactionService.transaction$.subscribe(data => {
      if (data) {
        this.transaction = data;
        console.log(data)
      }
    });

    // 2. Si pas trouvé, recharge depuis MongoDB
    if (!this.transaction) {
      const transactionId = this.route.snapshot.paramMap.get('id'); // si tu passes l'id en param
      console.log(transactionId)
      if (transactionId) {
        await this.transactionService.loadContratFromServer(transactionId);
      }
    }
  }
  

  goToPage(page: any) {
    this.router.navigate(['/'+page]);
  }

}
