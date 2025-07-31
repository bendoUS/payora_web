import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ArrowUpRight03Icon, ArrowRight01Icon, Agreement03Icon, ChartBreakoutSquareIcon, FileEmpty01Icon } from '@hugeicons/core-free-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {

  ArrowUpRight03Icon = ArrowUpRight03Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  Agreement03Icon = Agreement03Icon;
  ChartBreakoutSquareIcon = ChartBreakoutSquareIcon;
  FileEmpty01Icon = FileEmpty01Icon;

  isBrowser: boolean;

  users = [
    { name: 'Encaissement', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Paiements', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'Retrait', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },
    { name: 'Encaissement', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Retrait', email: 'alice@mail.com', role: 'Admin', status: 'Actif' }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object, public router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get isMainPage(): boolean {
    // True si tu es exactement sur /contrat
    return this.router.url === '/dashboard/transaction';
  }

  goToPage(page: any) {
    this.router.navigate(['/dashboard/transaction/'+page]);
  }

}
