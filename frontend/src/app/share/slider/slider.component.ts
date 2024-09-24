import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 2000,
    autoplay:false,
    smartSpeed: 1000,
    navText: ["<i class='icon-left-arrow'></i>", "<i class='icon-right-arrow'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateUrl(url:string){
    if(url){
      this.router.navigateByUrl(url)
    }else{
      this.router.navigateByUrl('/coming-soon')
    }
    }

}
