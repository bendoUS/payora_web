import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ArrowUpRight03Icon, ArrowRight01Icon, Agreement03Icon, ChartBreakoutSquareIcon } from '@hugeicons/core-free-icons';
import { ChartConfiguration, ChartType, ChartData, ChartOptions } from 'chart.js';

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

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
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
        data: [12, 19, 14, 25, 30, 22],
        backgroundColor: '#59F25A',
        borderRadius: 10
      }
    ]
  };


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Progression', 'Vide'],
    datasets: [
      {
        data: [70, 30], // 70% rempli
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

  users = [
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Bob Martin', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'David Blanchard', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },
  ];




}
