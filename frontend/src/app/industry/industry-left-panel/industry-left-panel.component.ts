import { Component, Input, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import ls from 'localstorage-slim';
import { Router } from '@angular/router';
import { ProfileService } from '../jobs-management/jobs-management-service/profile.service';
@Component({
  selector: 'app-industry-left-panel',
  templateUrl: './industry-left-panel.component.html',
  styleUrls: ['./industry-left-panel.component.scss']
})
export class IndustryLeftPanelComponent implements OnInit {
  activeleftmenu:number = 0
  profileImage!:string
  profileName!:string
  constructor(private _menuHandel:LeftMenuHandelService,private router:Router,private profileService:ProfileService) { }

  ngOnInit( ): void {
this.profileService.profileImage.subscribe({
  next:(res:any)=>{
    this.profileImage=res
  }
})
this.profileService.profileName.subscribe({
  next:(res:any)=>{
    this.profileName=res
  }
})
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
  logout(){
ls.clear()
this.router.navigateByUrl('/home')
  }
}
