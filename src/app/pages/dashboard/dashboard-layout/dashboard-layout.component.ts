import { Component } from '@angular/core';
import { Home01Icon, FirstBracketCircleIcon, File02Icon, Settings01Icon, Logout01Icon, EarthIcon } from '@hugeicons/core-free-icons';
import { SearchIcon, Payment01Icon, Invoice04Icon, JudgeIcon, Legal01Icon, ConnectIcon } from '@hugeicons/core-free-icons';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss',
    standalone: false
})
export class DashboardLayoutComponent {
  Home01Icon = Home01Icon;
  FirstBracketCircleIcon = FirstBracketCircleIcon;
  icon = SearchIcon;
  File02Icon = File02Icon;
  Payment01Icon = Payment01Icon;
  Invoice04Icon = Invoice04Icon;
  JudgeIcon = JudgeIcon;
  Legal01Icon = Legal01Icon;
  ConnectIcon = ConnectIcon;
  Settings01Icon = Settings01Icon;
  Logout01Icon = Logout01Icon;
  EarthIcon = EarthIcon;

  userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;

  constructor(private router: Router, private auth: AuthService) {}

  goToPage(page: any) {
    //this.router.navigate(['/'+page]);
  }
  loggout(){
    this.auth.logout()
    this.router.navigate(['/login']);
  }
}
