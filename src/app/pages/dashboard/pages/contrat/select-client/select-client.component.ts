import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrl: './select-client.component.scss',
  standalone: false
})
export class SelectClientComponent {

  searchTerm: string = '';
  isLoading: boolean = false;

  clients: any[] = []
  selectedClient: any = {};
  showAddNewUser: boolean = false;
  newClient: any = {
    name: '',
    prenom: '',
    email: '',
    adresse: '',
  };

  constructor(public dialogRef: MatDialogRef<SelectClientComponent>, private snackBar: MatSnackBar) { }


  searchClients() {
    this.isLoading = true;
    // Simulate an API call
    setTimeout(() => {
      this.isLoading = false;
      // Here you would typically filter the clients based on the search term
      // For now, we will just log the search term
      console.log('Searching for:', this.searchTerm);

      if (this.searchTerm.length <= 0) {
        this.clients = [];
        return;
      }

      let serchedClients = [
        { id: 1, name: 'Selom Goerke', email: 'selom.goerke@gmail.com', avatarUrl: 'https://i.pravatar.cc/100?img=22', active: false },
        { id: 2, name: 'Client Payora', email: 'invoice@payora.com', avatarUrl: 'https://i.pravatar.cc/100?img=45', active: false },
        { id: 3, name: 'Jean Puure', email: 'jean.puure@hotmail.io', avatarUrl: 'https://i.pravatar.cc/100?img=12', active: false },
        { id: 4, name: 'Sam Sumee', email: 'sam.sumee@yahoo.com', avatarUrl: 'https://i.pravatar.cc/100?img=19', active: false }
      ];

      this.clients = serchedClients.filter(client =>
        client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

    }, 1000);
  }
  sendContrat() {
    console.log('Selected Client:', this.selectedClient);
    this.dialogRef.close(this.selectedClient);
  }
  selectClient(index: number) {
    this.clients.forEach((item, i) => {
      item.active = false;
      item.active = i === index

      if (i === index) {
        this.selectedClient = this.clients[i];
      }
    }
    );
  }
  addNewUser(){
    console.log('Add new user clicked');
    this.showAddNewUser = true;
  }
  saveNewUser(){
    console.log('New user data:', this.newClient);
    this.clients.push({
      id: this.clients.length + 1,
      name: this.newClient.name + ' ' + this.newClient.prenom,
      email: this.newClient.email,
      adresse: this.newClient.adresse,
      avatarUrl: 'https://i.pravatar.cc/100?img=' + (this.clients.length + 10),
      active: false
    });
    this.showSnackBar('Nouveau client ajouté avec succès !');
    this.newClient = { name: '', prenom: '', email: '', adresse: '' };
    this.showAddNewUser = false;
  }
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // millisecondes
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }
}
