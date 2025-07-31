import { Component } from '@angular/core';
import { BrushIcon, RecordIcon, WebDesign02Icon, ComputerPhoneSyncIcon, GlobalIcon, MailOpenIcon, PencilEdit02Icon, PaintBrush04Icon, Store01Icon, Robot02Icon, SatelliteIcon, KeyframesMultipleIcon, EthereumIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-contrat-create',
  templateUrl: './contrat-create.component.html',
  styleUrl: './contrat-create.component.scss'
})
export class ContratCreateComponent {
  RecordIcon = RecordIcon

  currentStep = 1;
  servicesItems: any[] = [
    {icon: BrushIcon, title: 'Design UI/UX', subtitle: 'Contrat lié aux designers graphique', active: true},
    {icon: WebDesign02Icon, title: 'Développement web', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: ComputerPhoneSyncIcon, title: 'Marketing digital', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: GlobalIcon, title: 'Optimisation SEO', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: MailOpenIcon, title: 'Emailing CRM', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: PencilEdit02Icon, title: 'Rédaction web', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: PaintBrush04Icon, title: 'Charte graphique', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: Store01Icon, title: 'Tunnel de vente', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: Robot02Icon, title: 'Outils IA', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: SatelliteIcon, title: 'Campagnes publicitaires', subtitle: 'Contrat lié aux designers graphique', active: false},
    {icon: KeyframesMultipleIcon, title: 'Motion design', subtitle: 'Contrat lié aux designers graphique', active: false},
     {icon: EthereumIcon, title: 'Autres', subtitle: 'Contrat lié aux designers graphique', active: false}
  ]

  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

}
