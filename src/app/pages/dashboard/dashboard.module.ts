import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ContratComponent } from './pages/contrat/contrat.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { LawyerComponent } from './pages/lawyer/lawyer.component';
import { LitigeComponent } from './pages/litige/litige.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { HugeiconsIconComponent } from "@hugeicons/angular";

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomeComponent,
    ContratComponent,
    TransactionComponent,
    LawyerComponent,
    LitigeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    HugeiconsIconComponent,
    NgChartsModule
]
})
export class DashboardModule { }
