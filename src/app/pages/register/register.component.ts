import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ContratService } from '../../services/contrat.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  invitationData: any;

  selectedService: any = {
    title: 'UX/UI design'
  }
  articles: any[] = [
    { title: 'Article 1 : Objet', content: 'Le présent contrat a pour objet la réalisation d’une prestation de services en design d’interface utilisateur et expérience utilisateur (UI/UX). Le Prestataire s’engage à concevoir, développer et livrer des solutions graphiques et fonctionnelles adaptées aux besoins du Client. Cette prestation comprend notamment l’analyse approfondie des besoins et attentes des utilisateurs finaux, la création de wireframes détaillés, la réalisation de maquettes graphiques haute-fidélité, ainsi que le prototypage interactif. Le Prestataire devra également optimiser l’ergonomie et l’expérience globale proposée afin d’améliorer la satisfaction et l’engagement des utilisateurs. Les livrables devront respecter les standards actuels du design et prendre en compte les contraintes techniques spécifiées par le Client. Toute demande supplémentaire ou modification non prévue devra faire l’objet d’un avenant écrit entre les parties. Le Prestataire utilisera des outils professionnels et des méthodologies reconnues pour garantir la qualité du travail. Le Client fournira les informations nécessaires à la bonne compréhension du projet et validera chaque étape de la conception. Enfin, le Prestataire s’engage à assurer un suivi jusqu’à la livraison finale, incluant une phase de tests et corrections si nécessaire.' },
    { title: 'Article 2 : Durée', content: 'La durée de la prestation est estimée à [durée], à compter de la date de signature du présent contrat ou de la réception des éléments nécessaires fournis par le Client. Le Prestataire s’engage à respecter les délais convenus, sauf cas de force majeure ou retard imputable au Client. En cas de retard significatif, les parties se consulteront pour ajuster le planning ou les modalités de la prestation. La durée pourra être prolongée par accord écrit si le Client demande des modifications ou fonctionnalités supplémentaires. Pendant toute la durée du contrat, le Prestataire tiendra régulièrement informé le Client de l’avancement des travaux. Le Client devra fournir ses retours et validations dans des délais raisonnables afin de ne pas compromettre la bonne exécution. Si le Client ne répond pas sous un délai de [nombre] jours, le Prestataire pourra considérer que la validation est acquise. À l’issue de la période définie, si des éléments restent en suspens, un avenant pourra être proposé pour les finaliser. Le contrat pourra être renouvelé ou reconduit sous accord mutuel pour d’autres prestations.' },
    { title: 'Article 3 : Rémunération', content: 'Le montant total de la prestation est fixé à [montant en euros] €, hors taxes, conformément au devis accepté par le Client. Ce montant comprend l’ensemble des services décrits dans l’article 1, ainsi que les corrections liées à la phase de validation. Le paiement s’effectuera selon les modalités suivantes : un acompte de 30 % à la signature du contrat, un second versement de 40 % à mi-parcours, et le solde de 30 % à la livraison finale. En cas de retard de paiement, des pénalités pourront être appliquées conformément à la législation en vigueur. Toute prestation supplémentaire non prévue au contrat fera l’objet d’un devis complémentaire validé par le Client avant exécution. Les frais annexes, tels que les achats de licences ou outils spécifiques demandés par le Client, seront facturés en sus après validation. Le Prestataire fournira une facture pour chaque échéance de paiement. Le Client s’engage à régler les sommes dues dans un délai maximum de 30 jours après réception de la facture. En cas de non-paiement, le Prestataire se réserve le droit de suspendre la prestation jusqu’à régularisation.' },
    { title: 'Article 4 : Propriété intellectuelle', content: 'Le Prestataire garantit que les créations livrées dans le cadre de ce contrat sont originales et ne portent pas atteinte aux droits de tiers. Dès paiement intégral, le Prestataire cède au Client les droits d’utilisation, de reproduction, d’adaptation et de représentation des livrables pour les besoins spécifiés dans le contrat. Cette cession est limitée à l’usage prévu, notamment la diffusion sur les supports et plateformes indiqués par le Client. Le Prestataire conserve la propriété intellectuelle des outils, méthodes, savoir-faire et éléments génériques utilisés dans le cadre de la prestation. Le Client ne pourra ni revendre ni redistribuer les livrables à des tiers sans l’accord écrit préalable du Prestataire. Toute modification majeure réalisée par le Client sans consultation préalable du Prestataire pourra entraîner la perte de la garantie. Le Prestataire pourra toutefois exploiter les créations à des fins de communication ou portfolio, sauf opposition formelle du Client. Les documents de travail intermédiaires restent la propriété du Prestataire. La cession des droits ne concerne pas les éléments tiers (images, polices, composants) sous licence spécifique.' },
    { title: 'Article 5 : Confidentialité', content: 'Chaque partie s’engage à garder strictement confidentielles toutes les informations, documents et données échangés dans le cadre de la prestation. Cette obligation couvre aussi bien les informations techniques, commerciales que stratégiques. Les parties ne pourront divulguer ces informations à aucun tiers sans accord préalable écrit de l’autre partie. Cette confidentialité s’applique pendant toute la durée du contrat et pour une période de 5 ans après son expiration. Le Prestataire s’engage à prendre toutes les mesures nécessaires pour protéger les données du Client contre toute diffusion non autorisée. Le Client garantit également au Prestataire la confidentialité des méthodes et processus internes utilisés. En cas de manquement à cette clause, la partie fautive pourra être tenue responsable des préjudices causés. Cette clause ne s’applique pas aux informations qui seraient déjà publiques ou légalement accessibles. En cas de demande légale ou judiciaire, la partie concernée devra informer préalablement l’autre partie dans la mesure du possible.' }
  ]


  userInfo: any = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userToken: string = localStorage.getItem('userToken') || '';
  userStockData: any = JSON.parse(localStorage.getItem('userStockData') || '{}');

  showContract: boolean = false;
  haveToLogin: boolean = false;
  invitationExpired: boolean = false;

  showAcceptedPage: boolean = false;

  contrat: any;

  constructor(private route: ActivatedRoute, private api: ApiService, private contratService: ContratService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      const token = params['token'];
      if (token) {
        console.log("Token reçu :", token);
        let tokenData = await this.logUser(token)
        console.log(tokenData)
        this.invitationData = tokenData

        if (tokenData.status !== 'sent' || tokenData.expiresAt < new Date()) {
          this.invitationExpired = true
        }
        else {
          if (this.userInfo) {
            if (this.userInfo.email === tokenData.email) {
              console.log("affiché le user ", this.userInfo)
              this.showContract = true

              this.contratService.contrat$.subscribe(data => {
                if (data) {
                  this.contrat = data;
                }
              });

              if (tokenData.contractId) {
                await this.contratService.loadContratFromServer(tokenData.contractId);
              }
            }
            else {
              console.log('le compte associé à ce contrat est different veuillez vous connectez avec le bon compte', this.userInfo.email)
              this.haveToLogin = true
            }
          }
          else {
            console.log('Veuillez vous connecté pour consulter ce contrat')
            this.haveToLogin = true
          }
        }
      }
      else {
        window.location.href = '/dashboard';
      }

      // Tu peux maintenant l’envoyer à ton backend pour vérifier et lier le client
    });
  }

  logUser(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getData('invitation/verify', { token: token }, '').subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          console.error('Erreur API', err);
          reject(err);
        }
      });
    });
  }



  updateContrat(status: string) {

    this.api.getData('setContratDecision', { contratId: this.invitationData.contractId, userId: this.userStockData._id, status, invitToken: this.invitationData.token }, this.userToken).subscribe({
      next: (res: any) => {
        console.log(res)
        if(status === 'accepter'){
          this.showAcceptedPage = true
        }
      },
      error: (err: any) => {
        console.error('Erreur API', err);
      }
    });
  }

  goToPaiement(){
    //this.router.navigate(['dashboard/transaction/detail']);
    this.createPayementContrat(this.contrat)
  }

  goToDetail(){
    this.router.navigate(['dashboard/contrat/detail/' + this.invitationData.contractId]);
  }


  createPayementContrat(contrat: any) {
    console.log(contrat)
    this.api.postData('create-checkout-session', { contrat: contrat }).subscribe({
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
