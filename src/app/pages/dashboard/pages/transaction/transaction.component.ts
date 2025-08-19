import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ArrowUpRight03Icon, ArrowRight01Icon, Agreement03Icon, ChartBreakoutSquareIcon, FileEmpty01Icon } from '@hugeicons/core-free-icons';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrl: './transaction.component.scss',
    standalone: false
})
export class TransactionComponent {

  ArrowUpRight03Icon = ArrowUpRight03Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  Agreement03Icon = Agreement03Icon;
  ChartBreakoutSquareIcon = ChartBreakoutSquareIcon;
  FileEmpty01Icon = FileEmpty01Icon;

  isBrowser: boolean;
  transactions: any;

  users = [
    { name: 'Encaissement', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Paiements', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'Retrait', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },
    { name: 'Encaissement', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Retrait', email: 'alice@mail.com', role: 'Admin', status: 'Actif' }
  ];

  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userStockedData: any = JSON.parse(localStorage.getItem('userStockData') || '{}')
  userToken: string = localStorage.getItem('userToken') || '';

  constructor(@Inject(PLATFORM_ID) platformId: Object, public router: Router, private api: ApiService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get isMainPage(): boolean {
    // True si tu es exactement sur /contrat
    return this.router.url === '/dashboard/transaction';
  }

  goToPage(page: any, tid: string) {
    this.router.navigate(['/dashboard/transaction/'+page + '/'+tid]);
  }

  ngOnInit() {
    this.getTransactionList(this.userInfo.uid);
  }

  getTransactionList(uid: string) {
    this.api.getData('getTransactions', { uid }, this.userToken).subscribe({
      next: (res) => {
        console.log(res.transactions)
        this.transactions = res.transactions;
      },
      error: (err) => {
        console.error('Erreur API', err);
      }
    });
  }

}
