import { Component } from '@angular/core';
import { ArrowRight01Icon, FileEmpty01Icon, File01Icon, Invoice01Icon, Agreement01Icon, RemoveCircleHalfDotIcon, Legal01Icon } from '@hugeicons/core-free-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrl: './contrat.component.scss'
})
export class ContratComponent {

  ArrowRight01Icon = ArrowRight01Icon;
  FileEmpty01Icon = FileEmpty01Icon;
  File01Icon = File01Icon;
  Invoice01Icon = Invoice01Icon;
  Agreement01Icon = Agreement01Icon;
  RemoveCircleHalfDotIcon = RemoveCircleHalfDotIcon;
  Legal01Icon = Legal01Icon;

  users = [
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Bob Martin', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'David Blanchard', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' }
  ];

  constructor(public router: Router) {}

  get isMainPage(): boolean {
    // True si tu es exactement sur /contrat
    return this.router.url === '/dashboard/contrat';
  }

  goToPage(page: any) {
    this.router.navigate(['/dashboard/contrat/'+page]);
  }
}
