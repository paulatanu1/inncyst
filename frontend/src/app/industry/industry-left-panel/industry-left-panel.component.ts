import { Component, Input, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';

@Component({
  selector: 'app-industry-left-panel',
  templateUrl: './industry-left-panel.component.html',
  styleUrls: ['./industry-left-panel.component.scss']
})
export class IndustryLeftPanelComponent implements OnInit {
  activeleftmenu:number = 0
  constructor(private _menuHandel:LeftMenuHandelService) { }

  ngOnInit( ): void {

    this._menuHandel.leftMenuActive.subscribe({
      next:(res)=>{
        this.activeleftmenu = res
       
      },
      error:(err)=>{

      }
    })
    // if(this.activeleftmenu == ""){
    //   this.activeleftmenu = "dashboard";
    // }
  }

}
