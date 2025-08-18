import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private contratSource = new BehaviorSubject<any>(this.getFromStorage());
  contrat$ = this.contratSource.asObservable();

  userToken: string = localStorage.getItem('userToken') || '';

  constructor(private api: ApiService) { }

  setContrat(data: any, ttlMinutes = 30) {
    const now = new Date();
    const item = {
      value: data,
      expiry: now.getTime() + ttlMinutes * 60 * 1000 // ajoute X minutes
    };

    localStorage.setItem('currentContrat', JSON.stringify(item));
    this.contratSource.next(data);
  }


  private getFromStorage() {
    const itemStr = localStorage.getItem('currentContrat');
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Vérifie si expiré
    if (now.getTime() > item.expiry) {
      localStorage.removeItem('currentContrat'); // nettoyage
      return null;
    }

    return item.value;
  }


  async loadContratFromServer(contratId: string) {
    try {
      this.api.getData('getContrat', { contratId }, this.userToken).subscribe({
        next: (res) => {
          console.log(res)
          if (res) {
            this.setContrat(res);
          }
        },
        error: (err) => {
          console.error('Erreur API', err);
        }
      });
    } catch (err) {
      console.error('Erreur lors du chargement du contrat', err);
    }
  }

}
