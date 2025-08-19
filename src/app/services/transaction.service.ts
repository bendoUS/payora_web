import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionSource = new BehaviorSubject<any>(this.getFromStorage());
  transaction$ = this.transactionSource.asObservable();

  userToken: string = localStorage.getItem('userToken') || '';

  constructor(private api: ApiService) { }

  setTransaction(data: any, ttlMinutes = 30) {
    const now = new Date();
    const item = {
      value: data,
      expiry: now.getTime() + ttlMinutes * 60 * 1000 // ajoute X minutes
    };

    localStorage.setItem('currentTransaction', JSON.stringify(item));
    this.transactionSource.next(data);
  }

  private getFromStorage() {
    const itemStr = localStorage.getItem('currentTransaction');
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Vérifie si expiré
    if (now.getTime() > item.expiry) {
      localStorage.removeItem('currentTransaction'); // nettoyage
      return null;
    }

    return item.value;
  }


  async loadContratFromServer(tid: string) {
    try {
      this.api.getData('getTransaction', { tid }, this.userToken).subscribe({
        next: (res) => {
          console.log(res)
          if (res) {
            this.setTransaction(res);
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
