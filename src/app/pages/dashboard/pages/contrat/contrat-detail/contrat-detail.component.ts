import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Tick02Icon, Upload03Icon, Copy01Icon, Alert01Icon } from '@hugeicons/core-free-icons';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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

  isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

}
