import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-cards',
  templateUrl: './banner-cards.component.html',
  styleUrls: ['./banner-cards.component.scss']
})
export class BannerCardsComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  explore(){
    this.router.navigateByUrl('jobs/internships')
  }

}
