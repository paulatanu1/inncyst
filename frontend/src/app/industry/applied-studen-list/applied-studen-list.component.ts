import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applied-studen-list',
  templateUrl: './applied-studen-list.component.html',
  styleUrls: ['./applied-studen-list.component.scss']
})
export class AppliedStudenListComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe({
      next:res=>{
        console.log(res)
      }
    })
  }

}
