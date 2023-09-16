import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-banner-cards',
  templateUrl: './banner-cards.component.html',
  styleUrls: ['./banner-cards.component.scss']
})
export class BannerCardsComponent implements OnInit {
logInToken!:any;
  constructor(private router: Router,) { }

  ngOnInit(): void {
   this.logInToken= ls.get('login_token')
  }

  explore(){
    if(this.logInToken){
      this.router.navigateByUrl('jobs/internships')
    }
   else{
    this.router.navigateByUrl('jobs/basicInternship');
   }
  }

}
