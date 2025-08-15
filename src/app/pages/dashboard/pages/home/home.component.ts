import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ArrowUpRight03Icon, ArrowRight01Icon, Agreement03Icon, ChartBreakoutSquareIcon } from '@hugeicons/core-free-icons';
import { ChartConfiguration, ChartType, ChartData, ChartOptions } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent {
  ArrowUpRight03Icon = ArrowUpRight03Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  Agreement03Icon = Agreement03Icon;
  ChartBreakoutSquareIcon = ChartBreakoutSquareIcon;

  isBrowser: boolean;
  isLoading: boolean = true;

  dashboardData = {
    revenuTotal: 0,
    contratTotal: 0,
    fondDispo: 0,
    satifactionClients: 10,
    monthlySales: [0, 0, 0, 0, 0, 0], // en euros
    revenuGrowth: 0,
    contratGrowth: 0,
    fondDispoGrowth: 0,
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object, private snackBar: MatSnackBar, public router: Router, private api: ApiService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      },
      y: {
        display: true
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: 'Ventes mensuelles 2025'
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin'
    ],
    datasets: [
      {
        label: 'Ventes (en K€)',
        data: this.dashboardData.monthlySales,
        backgroundColor: '#59F25A',
        borderRadius: 10
      }
    ]
  };


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Progression', 'Vide'],
    datasets: [
      {
        data: [0, 100], // 70% rempli
        backgroundColor: ['#59F25A', '#e5e7eb'],
        borderWidth: 0
      }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,     // ✅ commence en bas
    circumference: 180, // ✅ demi-cercle
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: 'Ventes mensuelles 2025'
      }
    }
  };

  users: any = [
    /*{ name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Bob Martin', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'David Blanchard', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },*/
  ];

  homeData: any = {}


  goToPage(page: any) {
    this.router.navigate(['/dashboard/contrat/' + page]);
  }
  goToPagescnd(page: any){
    this.router.navigate(['/dashboard/' + page]);
  }

  async ngOnInit() {
    let userToken: any = localStorage.getItem('userToken');
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    this.homeData = await this.getHomeData(userInfo.uid, userToken);
  }

  getHomeData(uid: string, token: string,): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getData('getHomeData', { uid }, token).subscribe({
        next: (res) => {
          let data = res.user;
          console.log('Données Home API', data);
          resolve(data);
          this.isLoading = false
        },
        error: (err) => {
          console.error('Erreur API', err);
          reject(err);
          this.isLoading = false
        }
      });
    });
  }


}
