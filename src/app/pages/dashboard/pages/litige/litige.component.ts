import { Component } from '@angular/core';
import { ArrowRight01Icon, FileEmpty01Icon, File01Icon, Invoice01Icon, Agreement01Icon, RemoveCircleHalfDotIcon, Legal01Icon, BubbleChatNotificationIcon, FileSyncIcon, FileValidationIcon } from '@hugeicons/core-free-icons';
import { ApiService } from '../../../../services/api.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-litige',
  templateUrl: './litige.component.html',
  styleUrl: './litige.component.scss',
  standalone: false
})
export class LitigeComponent {

  FileEmpty01Icon = FileEmpty01Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  File01Icon = File01Icon;
  Invoice01Icon = Invoice01Icon;
  Agreement01Icon = Agreement01Icon;

  selectedCategory: string = "all";

  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userStockedData: any = JSON.parse(localStorage.getItem('userStockData') || '{}')
  userToken: string = localStorage.getItem('userToken') || '';

  litiges: any = [];

  categories = [
    { name: 'Tous les litiges', icon: Legal01Icon, route: 'all', status: true },
    { name: 'Réponses nécessaires', icon: BubbleChatNotificationIcon, route: 'ouvert', status: false },
    { name: 'En cours de vérification', icon: FileSyncIcon, route: 'en_cours', status: false },
    { name: 'Remportés', icon: FileValidationIcon, route: 'rembourse', status: false },
    { name: 'Perdus', icon: RemoveCircleHalfDotIcon, route: 'perdu', status: false }
  ];
  filtrerdLitiges: any[] = [];
  

  constructor(public router: Router, private api: ApiService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.maFonctionAuChangementDePage();
      });
  }

  get isMainPage(): boolean {
    // True si tu es exactement sur /contrat
    return this.router.url === '/dashboard/litige';
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
    this.getContratList(this.userInfo.uid);
  }

  getContratByStatus() {
    this.filtrerdLitiges = this.litiges.filter((c: { status: string; }) => {
      if (this.selectedCategory === 'all') {
        return true;
      }
      else {
        return c.status === this.selectedCategory
      }
    });
    console.log(this.litiges, this.filtrerdLitiges)
  }

  maFonctionAuChangementDePage() {
    this.getContratList(this.userInfo.uid);
  }

  getContratList(uid: string) {
    this.api.getData('getLitiges', { uid }, this.userToken).subscribe({
      next: (res) => {
        console.log(res)
        this.litiges = res.litiges;
        this.getContratByStatus()
      },
      error: (err) => {
        console.error('Erreur API', err);
      }
    });
  }

}
