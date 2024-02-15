import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.scss']
})
export class BasicProfileComponent implements OnInit {
  status!:number
  constructor(  
   
  
    private router: Router,

    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe({
      next: (param) => {
        this.status =<any> param.get('status');
      },
    });
  }
  handleChange(e:any){
    this.status=e.index  
    const urlTree=this.router.parseUrl(this.router.url);
        urlTree.queryParams['status']=e.index ;   
        this.router.navigateByUrl(urlTree);
    }
}
