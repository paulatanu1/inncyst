import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-banner-cards',
  templateUrl: './banner-cards.component.html',
  styleUrls: ['./banner-cards.component.scss']
})
export class BannerCardsComponent implements OnInit {
  items: MenuItem[]=[];
  // home: MenuItem | undefined;
logInToken!:any;
  constructor(private router: Router,) { }

  ngOnInit(): void {
   this.logInToken= ls.get('login_token')
   this.items = [
            {label: 'Computer'},
            {label: 'Notebook'},
            {label: 'Accessories'},
            {label: 'Backpacks'},
            {label: 'Item'}
        ];
        // this.home = {icon: 'pi pi-home'};
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
