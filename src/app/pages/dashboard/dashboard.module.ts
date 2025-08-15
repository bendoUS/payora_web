import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ContratComponent } from './pages/contrat/contrat.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { LawyerComponent } from './pages/lawyer/lawyer.component';
import { LitigeComponent } from './pages/litige/litige.component';
import { ContratDetailComponent } from './pages/contrat/contrat-detail/contrat-detail.component';
import { ContratCreateComponent } from './pages/contrat/contrat-create/contrat-create.component';
import { TransactionDetailComponent } from './pages/transaction/transaction-detail/transaction-detail.component';
import { SelectClientComponent } from './pages/contrat/select-client/select-client.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HugeiconsIconComponent } from "@hugeicons/angular";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MomentPipe } from '../../pipes/moment.pipe';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { NgChartsModule } from 'ng2-charts';
import { QRCodeComponent } from 'angularx-qrcode';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomeComponent,
    ContratComponent,
    TransactionComponent,
    LawyerComponent,
    LitigeComponent,
    ContratDetailComponent,
    ContratCreateComponent,
    TransactionDetailComponent,
    SelectClientComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HugeiconsIconComponent,
    NgChartsModule,
    QRCodeComponent,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MomentPipe
]
})
export class DashboardModule { }
