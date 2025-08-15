import { Component } from '@angular/core';
import { ArrowRight01Icon, FileEmpty01Icon, File01Icon, Invoice01Icon, Agreement01Icon, RemoveCircleHalfDotIcon, Legal01Icon } from '@hugeicons/core-free-icons';
import { Router, NavigationEnd } from '@angular/router';
import { stat } from 'fs';
import { ApiService } from '../../../../services/api.service';
import { filter } from 'rxjs/operators';

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

  contracts: any = [
    //{ name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    /*{ name: 'Bob Martin', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'David Blanchard', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' }*/
  ];

  categories = [
    { name: 'Contrats actifs', icon: File01Icon, route: 'active', status: true },
    { name: 'Contrats en cours', icon: Invoice01Icon, route: 'pending', status: false },
    { name: 'Contrats validé', icon: Agreement01Icon, route: 'validate', status: false },
    { name: 'Contrats rejetés', icon: RemoveCircleHalfDotIcon, route: 'rejected', status: false },
    { name: 'Contrats sous litiges', icon: Legal01Icon, route: 'legal', status: false }
  ];
  filtrerdContracts: any[] = [];

  contratStats: any = {
    totalContracts: 0,
    activeContracts: 0,
    rejectedContracts: 0
  }

  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userToken: string = localStorage.getItem('userToken') || '';

  selectedCategory: string = "active";

  constructor(public router: Router, private api: ApiService) {
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

  goToPage(page: any) {
    this.router.navigate(['/dashboard/contrat/' + page]);
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
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.getContratList(this.userInfo.uid);
  }

  getContratList(uid: string) {
    this.api.getData('getContrats', { uid }, this.userToken).subscribe({
      next: (res) => {
        console.log(res)
        this.contracts = res;
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
    console.log(this.contracts)
    this.filtrerdContracts = this.contracts.filter((c: { status: string; }) => c.status === this.selectedCategory);
  }
}
