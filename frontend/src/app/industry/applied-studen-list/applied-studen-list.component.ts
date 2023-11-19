import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobListApiService } from '../jobs-management/posts/job-list-api.service';

@Component({
  selector: 'app-applied-studen-list',
  templateUrl: './applied-studen-list.component.html',
  styleUrls: ['./applied-studen-list.component.scss']
})
export class AppliedStudenListComponent implements OnInit {
studentListData:any=[]
  constructor(private activatedRoute:ActivatedRoute, private _JobListApiService:JobListApiService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe({
      next:res=>{
        console.log(res)
        this._JobListApiService.getAppliedStudent(res['id']).subscribe({
          next:(res=>{
            this.studentListData=res.data
            console.log(this.studentListData)
          })
        })
      }
    })
  }

}
