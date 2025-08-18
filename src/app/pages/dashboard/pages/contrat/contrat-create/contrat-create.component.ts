import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrushIcon, RecordIcon, WebDesign02Icon, ComputerPhoneSyncIcon, GlobalIcon, MailOpenIcon, PencilEdit02Icon, PaintBrush04Icon, Store01Icon, Robot02Icon, SatelliteIcon, KeyframesMultipleIcon, EthereumIcon } from '@hugeicons/core-free-icons';
import { title } from 'node:process';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectClientComponent } from '../select-client/select-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-contrat-create',
  templateUrl: './contrat-create.component.html',
  styleUrl: './contrat-create.component.scss',
  standalone: false
})
export class ContratCreateComponent {
  RecordIcon = RecordIcon

  isBrowser: boolean;
  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userData: any = {
    name: this.userInfo.displayName,
    email: this.userInfo.email,
    adresse: "",
    tel: "",
    uid: this.userInfo.uid
  }
  contract_emmitter: string = "presta"
  userToken: string = localStorage.getItem('userToken') || '';

  userStockedData: any = JSON.parse(localStorage.getItem('userStockData') || '{}')

  pdfSrc = "https://firebasestorage.googleapis.com/v0/b/discord-mapbox.appspot.com/o/pdf%2F1y2zvk-tx.myshopify.com-2025-02-28T16%3A40%3A28.370Z-Asistent_Virtual%20(1).pdf?alt=media&token=15881377-0529-4d86-bf01-83a4b61153a9"

  informationsBase = {
    nom: '',
    description: '',
    duree: '',
    tarif: '',
    penalite: '',
    engagements: '',
    infos: '',
    droits: ''
  }
  currentStep = 4;
  selectedService: any = { icon: BrushIcon, title: 'Design UI/UX', subtitle: 'Contrat lié aux designers graphique', active: true };
  servicesItems: any[] = [
    { icon: BrushIcon, title: 'Design UI/UX', subtitle: 'Contrat lié aux designers graphique', active: true },
    { icon: WebDesign02Icon, title: 'Développement web', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: ComputerPhoneSyncIcon, title: 'Marketing digital', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: GlobalIcon, title: 'Optimisation SEO', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: MailOpenIcon, title: 'Emailing CRM', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: PencilEdit02Icon, title: 'Rédaction web', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: PaintBrush04Icon, title: 'Charte graphique', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: Store01Icon, title: 'Tunnel de vente', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: Robot02Icon, title: 'Outils IA', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: SatelliteIcon, title: 'Campagnes publicitaires', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: KeyframesMultipleIcon, title: 'Motion design', subtitle: 'Contrat lié aux designers graphique', active: false },
    { icon: EthereumIcon, title: 'Autres', subtitle: 'Contrat lié aux designers graphique', active: false }
  ]
  inputElem: string = '';
  recapitulatif: string = 'Le contrat définit une prestation de design UI/UX complète, incluant analyse, création et optimisation, avec un engagement sur la qualité et le suivi. La durée est fixée à partir de la signature, avec respect des délais et possibilité d’ajustement. La rémunération est prévue en plusieurs échéances, avec pénalités en cas de retard. Les droits d’utilisation sont cédés au client après paiement, tandis que le prestataire conserve ses méthodes. Les deux parties s’engagent à préserver la confidentialité des informations échangées pendant et après le contrat.';

  selectedClient: any = {}
  isLoading: boolean = false;

  articles: any[] = [
    { title: 'Article 1 : Objet', content: 'Le présent contrat a pour objet la réalisation d’une prestation de services en design d’interface utilisateur et expérience utilisateur (UI/UX). Le Prestataire s’engage à concevoir, développer et livrer des solutions graphiques et fonctionnelles adaptées aux besoins du Client. Cette prestation comprend notamment l’analyse approfondie des besoins et attentes des utilisateurs finaux, la création de wireframes détaillés, la réalisation de maquettes graphiques haute-fidélité, ainsi que le prototypage interactif. Le Prestataire devra également optimiser l’ergonomie et l’expérience globale proposée afin d’améliorer la satisfaction et l’engagement des utilisateurs. Les livrables devront respecter les standards actuels du design et prendre en compte les contraintes techniques spécifiées par le Client. Toute demande supplémentaire ou modification non prévue devra faire l’objet d’un avenant écrit entre les parties. Le Prestataire utilisera des outils professionnels et des méthodologies reconnues pour garantir la qualité du travail. Le Client fournira les informations nécessaires à la bonne compréhension du projet et validera chaque étape de la conception. Enfin, le Prestataire s’engage à assurer un suivi jusqu’à la livraison finale, incluant une phase de tests et corrections si nécessaire.' },
    { title: 'Article 2 : Durée', content: 'La durée de la prestation est estimée à [durée], à compter de la date de signature du présent contrat ou de la réception des éléments nécessaires fournis par le Client. Le Prestataire s’engage à respecter les délais convenus, sauf cas de force majeure ou retard imputable au Client. En cas de retard significatif, les parties se consulteront pour ajuster le planning ou les modalités de la prestation. La durée pourra être prolongée par accord écrit si le Client demande des modifications ou fonctionnalités supplémentaires. Pendant toute la durée du contrat, le Prestataire tiendra régulièrement informé le Client de l’avancement des travaux. Le Client devra fournir ses retours et validations dans des délais raisonnables afin de ne pas compromettre la bonne exécution. Si le Client ne répond pas sous un délai de [nombre] jours, le Prestataire pourra considérer que la validation est acquise. À l’issue de la période définie, si des éléments restent en suspens, un avenant pourra être proposé pour les finaliser. Le contrat pourra être renouvelé ou reconduit sous accord mutuel pour d’autres prestations.' },
    { title: 'Article 3 : Rémunération', content: 'Le montant total de la prestation est fixé à [montant en euros] €, hors taxes, conformément au devis accepté par le Client. Ce montant comprend l’ensemble des services décrits dans l’article 1, ainsi que les corrections liées à la phase de validation. Le paiement s’effectuera selon les modalités suivantes : un acompte de 30 % à la signature du contrat, un second versement de 40 % à mi-parcours, et le solde de 30 % à la livraison finale. En cas de retard de paiement, des pénalités pourront être appliquées conformément à la législation en vigueur. Toute prestation supplémentaire non prévue au contrat fera l’objet d’un devis complémentaire validé par le Client avant exécution. Les frais annexes, tels que les achats de licences ou outils spécifiques demandés par le Client, seront facturés en sus après validation. Le Prestataire fournira une facture pour chaque échéance de paiement. Le Client s’engage à régler les sommes dues dans un délai maximum de 30 jours après réception de la facture. En cas de non-paiement, le Prestataire se réserve le droit de suspendre la prestation jusqu’à régularisation.' },
    { title: 'Article 4 : Propriété intellectuelle', content: 'Le Prestataire garantit que les créations livrées dans le cadre de ce contrat sont originales et ne portent pas atteinte aux droits de tiers. Dès paiement intégral, le Prestataire cède au Client les droits d’utilisation, de reproduction, d’adaptation et de représentation des livrables pour les besoins spécifiés dans le contrat. Cette cession est limitée à l’usage prévu, notamment la diffusion sur les supports et plateformes indiqués par le Client. Le Prestataire conserve la propriété intellectuelle des outils, méthodes, savoir-faire et éléments génériques utilisés dans le cadre de la prestation. Le Client ne pourra ni revendre ni redistribuer les livrables à des tiers sans l’accord écrit préalable du Prestataire. Toute modification majeure réalisée par le Client sans consultation préalable du Prestataire pourra entraîner la perte de la garantie. Le Prestataire pourra toutefois exploiter les créations à des fins de communication ou portfolio, sauf opposition formelle du Client. Les documents de travail intermédiaires restent la propriété du Prestataire. La cession des droits ne concerne pas les éléments tiers (images, polices, composants) sous licence spécifique.' },
    { title: 'Article 5 : Confidentialité', content: 'Chaque partie s’engage à garder strictement confidentielles toutes les informations, documents et données échangés dans le cadre de la prestation. Cette obligation couvre aussi bien les informations techniques, commerciales que stratégiques. Les parties ne pourront divulguer ces informations à aucun tiers sans accord préalable écrit de l’autre partie. Cette confidentialité s’applique pendant toute la durée du contrat et pour une période de 5 ans après son expiration. Le Prestataire s’engage à prendre toutes les mesures nécessaires pour protéger les données du Client contre toute diffusion non autorisée. Le Client garantit également au Prestataire la confidentialité des méthodes et processus internes utilisés. En cas de manquement à cette clause, la partie fautive pourra être tenue responsable des préjudices causés. Cette clause ne s’applique pas aux informations qui seraient déjà publiques ou légalement accessibles. En cas de demande légale ou judiciaire, la partie concernée devra informer préalablement l’autre partie dans la mesure du possible.' }
  ]
  preambule: any = {
    title: 'PREAMBULE',
    paragraphes: [
      "Dans le souci de respecter l'obligation déontologique qui est la sienne d'assurer la permanence des soins et conformément aux dispositions de l'article R.4127-65 du code de la santé publique (code de déontologie médicale), (non renseigné) a contacté (non renseigné) pour prendre en charge, lors de la cessation temporaire de son activité professionnelle habituelle, les patients qui feraient appel à elle/lui.",
      "Pour permettre le bon déroulement de ce remplacement, (non renseigné) met à la disposition de (non renseigné) son cabinet de consultation, situé au (non renseigné), et son secrétariat.",
      "Le présent contrat a pour objet de définir les conditions dans lesquelles (non renseigné) s'engage à assurer le remplacement de (non renseigné) et à prendre en charge ses patients."
    ]
  }

  constructor(public router: Router, @Inject(PLATFORM_ID) platformId: Object, private snackBar: MatSnackBar, private dialog: MatDialog, private api: ApiService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 4) this.currentStep++;
    if (this.currentStep === 3) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000); // Simule un délai de chargement de 2 secondes
    }
    if (this.currentStep === 4) {
      this.isLoading = true;
      this.saveNewContrat(); // Remplace 'uid' par l'ID réel du contrat
      setTimeout(() => {
        this.isLoading = false;
        this.showSnackBar('Contrat créé avec succès !');
      }, 3000); // Simule un délai de chargement de 2 secondes
    }
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  selectService(index: number) {
    this.servicesItems.forEach((item, i) => {
      item.active = false;
      item.active = i === index

      if (i === index) {
        this.selectedService = this.servicesItems[i];
      }
    }
    );
  }

  isInformationsBaseValid(): boolean {
    // Vérifie que chaque valeur de l'objet n'est pas vide (string vide ou null/undefined)
    return !Object.values(this.informationsBase).every(
      value => value !== null && value !== undefined && value.toString().trim() !== ''
    );
  }

  goToPage(page: any) {
    this.router.navigate(['/dashboard/contrat/' + page]);
  }

  copyToClipboard(text: string): void {
    if (navigator.clipboard && window.isSecureContext) {
      // Méthode moderne et sécurisée
      navigator.clipboard.writeText(text).then(() => {
        this.showSnackBar('Texte copié dans le presse-papiers !');
        console.log('Texte copié dans le presse-papiers');
      }).catch(err => {
        console.error('Erreur lors de la copie : ', err);
      });
    } else {
      // Fallback pour navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = text;

      // Éviter que le textarea soit visible et perturbe le layout
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        this.showSnackBar('Texte copié dans le presse-papiers !');
        console.log('Texte copié dans le presse-papiers (fallback)');
      } catch (err) {
        console.error('Erreur lors de la copie (fallback): ', err);
      }

      document.body.removeChild(textArea);
    }
  }


  showSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // millisecondes
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelectClientComponent, {
      width: '800px',
      data: { /* tu peux passer des données ici si besoin */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialog a été fermé', result);
      if (result) {
        this.selectedClient = result;
      }
      // Traite le résultat ici si besoin
    });
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    console.log('User Info:', this.userInfo);
  }

  saveNewContrat() {

    let documentElement = {
      preambule: this.preambule,
      articles: this.articles,
      payoraContract: "¹ Il est recommandé que les modalités habituelles de fonctionnement du cabinet soient précisées à la/au remplaçant(e), dans le souci de la permanence des soins. ² Cette activité personnelle ne devra en aucun cas être préjudiciable à la permanence des soins au sein du cabinet du médecin remplacé(e), activité justificative de l'établissement dudit contrat et ne pourra jamais être une activité de soins donnant lieu à délivrance de feuilles de maladie; ³ il ne peut s'agir que de médecine de prévention, d'examens pour des compagnies d'assurances... qui entrent dans l'activité habituelle de la/du remplaçant(e). Clause facultative, à débattre entre les signataires; elle devra faire l'objet d'une annexe au présent contrat. ⁴ Il serait souhaitable que la copie de cette assurance soit jointe au présent contrat. ⁵ Le taux de rétrocession d'honoraires doit être en rapport avec les charges du cabinet. ⁶ La clause d'arbitrage (clause compromissoire) est facultative et les parties peuvent décider de ne pas y recourir ou encore y recourir dans des conditions différentes de celles proposées ci-dessus. ⁷ Les parties peuvent renoncer à cette modalité de l'arbitrage et, dans ce cas, il suffit de supprimer la mention de l'amiable composition."
    }


    /*let contratData = { title: this.informationsBase.nom, subtitle: this.informationsBase.description, uid: this.userInfo.uid, status: 'pending', createdAt: actualDate.toISOString(), value: this.informationsBase.tarif, emmetter: this.userInfo.displayName, concerned: '-', email: this.userInfo.email }*/

    let contratData = {
      documentElement,
      contractRecap: this.recapitulatif,
      contractReplies: this.informationsBase,
      prestaId: this.userStockedData._id,
    }

    this.api.postData('setContrats', contratData).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.error('Erreur API', err);
      }
    });
  }


}
