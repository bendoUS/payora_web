import { Component } from '@angular/core';
import { ArrowRight01Icon, FileEmpty01Icon, File01Icon, Invoice01Icon, Agreement01Icon, RemoveCircleHalfDotIcon, Legal01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrl: './contrat.component.scss'
})
export class ContratComponent {

  ArrowRight01Icon = ArrowRight01Icon;
  FileEmpty01Icon = FileEmpty01Icon;
  File01Icon = File01Icon;
  Invoice01Icon = Invoice01Icon;
  Agreement01Icon = Agreement01Icon;
  RemoveCircleHalfDotIcon = RemoveCircleHalfDotIcon;
  Legal01Icon = Legal01Icon;

  users = [
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Bob Martin', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'David Blanchard', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' }
  ];
}
