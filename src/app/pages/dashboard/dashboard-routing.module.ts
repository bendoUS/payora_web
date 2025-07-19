import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ContratComponent } from './pages/contrat/contrat.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { AccountingComponent } from './pages/accounting/accounting.component';
import { AffiliateComponent } from './pages/affiliate/affiliate.component';
import { LawyerComponent } from './pages/lawyer/lawyer.component';
import { LitigeComponent } from './pages/litige/litige.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contrat', component: ContratComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'accounting', component: AccountingComponent },
      { path: 'affiliate', component: AffiliateComponent },
      { path: 'lawyer', component: LawyerComponent },
      { path: 'litige', component: LitigeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
