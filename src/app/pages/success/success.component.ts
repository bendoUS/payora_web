import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-success',
  imports: [CommonModule, FormsModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  standalone: true
})
export class SuccessComponent {

  cid: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      const cid = params['cid'];
      console.log(cid)
      if(cid){
        this.cid = cid
      }
      else{
        window.location.href = "/dashboard"
      }
    })
  }

  goToDetail(){
    window.location.href = 'dashboard/contrat/';
  }

}
