import { Component } from '@angular/core';
import { ArrowRight01Icon, FileEmpty01Icon, File01Icon, Invoice01Icon, Agreement01Icon, RemoveCircleHalfDotIcon, Legal01Icon, BubbleChatNotificationIcon, FileSyncIcon, FileValidationIcon } from '@hugeicons/core-free-icons';

@Component({
    selector: 'app-litige',
    templateUrl: './litige.component.html',
    styleUrl: './litige.component.scss',
    standalone: false
})
export class LitigeComponent {

  FileEmpty01Icon = FileEmpty01Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  File01Icon = File01Icon;
  Invoice01Icon = Invoice01Icon;
  Agreement01Icon = Agreement01Icon;
  RemoveCircleHalfDotIcon = RemoveCircleHalfDotIcon;
  Legal01Icon = Legal01Icon;
  BubbleChatNotificationIcon = BubbleChatNotificationIcon;
  FileSyncIcon = FileSyncIcon;
  FileValidationIcon = FileValidationIcon;


  users = [
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Bob Martin', email: 'bob@mail.com', role: 'Utilisateur', status: 'Inactif' },
    { name: 'David Blanchard', email: 'david@mail.com', role: 'Utilisateur', status: 'Suspendu' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' },
    { name: 'Alice Dupont', email: 'alice@mail.com', role: 'Admin', status: 'Actif' }
  ];

}
