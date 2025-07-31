import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Menu02Icon, Clock04Icon, ArrowUpRight01Icon, Attachment02Icon } from '@hugeicons/core-free-icons';
import { text } from 'stream/consumers';

@Component({
    selector: 'app-lawyer',
    templateUrl: './lawyer.component.html',
    styleUrl: './lawyer.component.scss',
    standalone: false
})
export class LawyerComponent {

  Menu02Icon = Menu02Icon;
  Clock04Icon = Clock04Icon;
  ArrowUpRight01Icon = ArrowUpRight01Icon;
  Attachment02Icon = Attachment02Icon;

  userAvatar = 'https://i.pravatar.cc/100?img=3';
  botAvatar = 'https://i.pravatar.cc/100?img=12';

  @ViewChild('scroll', { static: false }) scrollAnchor!: ElementRef<HTMLDivElement>;

  messageLoading: boolean = false

  message: string = '';
  //actuelMessages: { text: string; from: 'user' | 'bot' }[] = []
  actuelMessages: any[] = [
    { text: "You've successfully run and modified your React Native App. If you want to add this new React Native code to an existing application, check out the. Open App.tsx in your text editor of choice  and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh. When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload: Android: Press the R key twice or select 'Reload' from the Dev Menu, accessed via Ctrl + M (Windows/Linux) or Cmd ⌘ + M (macOS). iOS: Press R in iOS Simulator.", from: 'user' },
    { text: "You've successfully run and modified your React Native App. If you want to add this new React Native code to an existing application, check out the. Open App.tsx in your text editor of choice  and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh. When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload: Android: Press the R key twice or select 'Reload' from the Dev Menu, accessed via Ctrl + M (Windows/Linux) or Cmd ⌘ + M (macOS). iOS: Press R in iOS Simulator.", from: 'bot' },
    { text: "You've successfully run and modified your React Native App. If you want to add this new React Native code to an existing application, check out the. Open App.tsx in your text editor of choice  and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh. When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload: Android: Press the R key twice or select 'Reload' from the Dev Menu, accessed via Ctrl + M (Windows/Linux) or Cmd ⌘ + M (macOS). iOS: Press R in iOS Simulator.", from: 'user' },
    { text: "You've successfully run and modified your React Native App. If you want to add this new React Native code to an existing application, check out the. Open App.tsx in your text editor of choice  and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh. When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload: Android: Press the R key twice or select 'Reload' from the Dev Menu, accessed via Ctrl + M (Windows/Linux) or Cmd ⌘ + M (macOS). iOS: Press R in iOS Simulator.", from: 'bot' },
    { text: "You've successfully run and modified your React Native App. If you want to add this new React Native code to an existing application, check out the. Open App.tsx in your text editor of choice  and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh. When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload: Android: Press the R key twice or select 'Reload' from the Dev Menu, accessed via Ctrl + M (Windows/Linux) or Cmd ⌘ + M (macOS). iOS: Press R in iOS Simulator.", from: 'user' },
    { text: "You've successfully run and modified your React Native App. If you want to add this new React Native code to an existing application, check out the. Open App.tsx in your text editor of choice  and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh. When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload: Android: Press the R key twice or select 'Reload' from the Dev Menu, accessed via Ctrl + M (Windows/Linux) or Cmd ⌘ + M (macOS). iOS: Press R in iOS Simulator.", from: 'bot' }
  ]

  onSend() {
    if (!this.message.trim()) return;
    
    this.messageLoading = true

    // Ajouter le message de l'utilisateur
    this.actuelMessages.push({ text: this.message, from: 'user' });
    this.scrollToBottom();

    // Réponse simulée du bot
    setTimeout(() => {
      this.actuelMessages.push({ text: 'Bot : ' + this.message, from: 'bot' });
      this.scrollToBottom();
      this.messageLoading = false
    }, 500);

    this.message = '';
    
  }

  onUpload() {
    console.log('Uploader un fichier...');
  }


  scrollToBottom() {
    setTimeout(() => {
      if (this.scrollAnchor?.nativeElement?.scrollIntoView) {
        this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }



}
