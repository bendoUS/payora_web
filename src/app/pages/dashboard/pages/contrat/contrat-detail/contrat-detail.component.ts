import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Tick02Icon, Upload03Icon, Copy01Icon, Alert01Icon, CancelCircleIcon, Legal01Icon } from '@hugeicons/core-free-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ContratService } from '../../../../../services/contrat.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectClientComponent } from '../select-client/select-client.component';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-contrat-detail',
  templateUrl: './contrat-detail.component.html',
  styleUrl: './contrat-detail.component.scss',
  standalone: false
})
export class ContratDetailComponent {
  Tick02Icon = Tick02Icon
  Upload03Icon = Upload03Icon
  Copy01Icon = Copy01Icon
  Alert01Icon = Alert01Icon
  CancelCircleIcon = CancelCircleIcon
  Legal01Icon = Legal01Icon

  isBrowser: boolean;

  contrat: any;

  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userType: string = ""

  constructor(@Inject(PLATFORM_ID) platformId: Object, private contratService: ContratService, private route: ActivatedRoute, private dialog: MatDialog, private api: ApiService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit() {

    console.log(this.userInfo)
    // 1. Essaye de charger depuis le service/localStorage
    this.contratService.contrat$.subscribe(data => {
      if (data) {
        this.contrat = data;
        console.log(data)
      }
    });

    // 2. Si pas trouvé, recharge depuis MongoDB
    if (!this.contrat) {
      const contratId = this.route.snapshot.paramMap.get('id'); // si tu passes l'id en param
      if (contratId) {
        await this.contratService.loadContratFromServer(contratId);
      }
    }
  }

  openDialog() {
    const contratId = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(SelectClientComponent, {
      width: '800px',
      data: {
        id: contratId
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const contratId = this.route.snapshot.paramMap.get('id'); // si tu passes l'id en param
        if (contratId) {
          await this.contratService.loadContratFromServer(contratId);
        }
      }
    });
  }

  createPayementContrat() {
    this.api.postData('create-checkout-session', { contrat: this.contrat }).subscribe({
      next: (res: any) => {
        console.log(res)
        window.location.href = res.url
      },
      error: (err: any) => {
        console.error('Erreur API', err);
      }
    });
  }

}
