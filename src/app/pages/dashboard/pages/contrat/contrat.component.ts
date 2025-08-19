import { Component } from '@angular/core';
import { ArrowRight01Icon, FileEmpty01Icon, File01Icon, Invoice01Icon, Agreement01Icon, RemoveCircleHalfDotIcon, Legal01Icon } from '@hugeicons/core-free-icons';
import { Router, NavigationEnd } from '@angular/router';
import { stat } from 'fs';
import { ApiService } from '../../../../services/api.service';
import { filter } from 'rxjs/operators';
import { ContratService } from '../../../../services/contrat.service';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrl: './contrat.component.scss',
  standalone: false
})
export class ContratComponent {

  ArrowRight01Icon = ArrowRight01Icon;
  FileEmpty01Icon = FileEmpty01Icon;
  File01Icon = File01Icon;
  Invoice01Icon = Invoice01Icon;
  Agreement01Icon = Agreement01Icon;
  RemoveCircleHalfDotIcon = RemoveCircleHalfDotIcon;
  Legal01Icon = Legal01Icon;

  contracts: any = [];

  categories = [
    { name: 'Contrats actifs', icon: File01Icon, route: 'pending', status: true },
    { name: 'Contrats en brouillon', icon: Invoice01Icon, route: 'draft', status: false },
    { name: 'Contrats validé', icon: Agreement01Icon, route: 'expired', status: false },
    { name: 'Contrats rejetés', icon: RemoveCircleHalfDotIcon, route: 'rejected', status: false },
    { name: 'Contrats sous litiges', icon: Legal01Icon, route: 'dispute', status: false }
  ];
  filtrerdContracts: any[] = [];

  contratStats: any = {
    totalContracts: 0,
    activeContracts: 0,
    rejectedContracts: 0
  }

  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userStockedData: any = JSON.parse(localStorage.getItem('userStockData') || '{}')
  userToken: string = localStorage.getItem('userToken') || '';

  selectedCategory: string = "pending";

  constructor(public router: Router, private api: ApiService, private contratService: ContratService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.maFonctionAuChangementDePage();
      });
  }


  get isMainPage(): boolean {
    // True si tu es exactement sur /contrat
    return this.router.url === '/dashboard/contrat';
  }

  goToPage(page: any, contrat: any) {
    if (page == 'detail') {
      this.selectContrat(contrat)
      this.router.navigate(['/dashboard/contrat/' + page, contrat.cid]);
    }
    else {
      this.router.navigate(['/dashboard/contrat/' + page]);
    }

  }

  selectCategory(index: number) {
    // Met à jour le statut de la catégorie sélectionnée
    this.categories.forEach((categorie, i) => {
      categorie.status = false; // Réinitialise tous les statuts à false
      categorie.status = (i === index);
      if (i === index) {
        this.selectedCategory = categorie.route;
        this.getContratByStatus()
      }
    });
  }

  ngOnInit() {
    console.log(this.userStockedData)
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.getContratList(this.userInfo.uid);
  }

  getContratList(uid: string) {
    this.api.getData('getContracts', { uid }, this.userToken).subscribe({
      next: (res) => {
        this.contracts = res.contrats;
        this.getContratByStatus()
      },
      error: (err) => {
        console.error('Erreur API', err);
      }
    });
  }
  maFonctionAuChangementDePage() {
    this.getContratList(this.userInfo.uid);
  }

  getContratByStatus() {
    this.filtrerdContracts = this.contracts.filter((c: { status: string; }) => {
      if (this.selectedCategory === 'pending') {
        return (
          c.status === 'pending' ||
          c.status === 'pending_payment' ||
          c.status === 'accepted'
        );
      }
      else {
        return c.status === this.selectedCategory
      }
    });
    console.log(this.contracts, this.filtrerdContracts)
  }

  selectContrat(contrat: any) {
    this.contratService.setContrat(contrat, 30);
  }
}
