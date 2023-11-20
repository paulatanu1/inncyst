import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobListApiService } from '../jobs-management/posts/job-list-api.service';
import { environment } from 'src/environments/environment';
import { ToastServiceService } from 'src/app/service/toast-service.service';
interface Istatus{
  name: string;
  value: string;
}
@Component({
  selector: 'app-applied-studen-list',
  templateUrl: './applied-studen-list.component.html',
  styleUrls: ['./applied-studen-list.component.scss']
})
export class AppliedStudenListComponent implements OnInit {
studentListData:any=[]
editDialog:boolean=false
status!:Istatus[]
selectedStatus!: Istatus ;
  constructor(private activatedRoute:ActivatedRoute, private _JobListApiService:JobListApiService,private _toast:ToastServiceService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe({
      next:res=>{
        console.log(res)
        this._JobListApiService.getAppliedStudent(res['id']).subscribe({
          next:(res=>{
            this.studentListData=res.data
            console.log(this.studentListData[0].userId.image)
            this.studentListData.forEach((item:any)=>{
              console.log(item.userId)
              console.log(environment.API_URL+item.userId.image)
              // item.userId.image = environment.API_URL + item.userId.image;
              item.resume = environment.API_URL + item.resume;
            })
            console.log(this.studentListData)
          })
        })
      }
    })

    
    this.status = [
      { name: 'Pending', value: 'pending' },
      { name: 'Interview Scheduled', value: 'interviewScheduled' },
      { name: 'Hired', value: 'hired' },
      { name: 'Not Selected', value: 'notSelected' },
      { name: 'Rejected', value: 'rejected' },
      { name: 'SortListed', value: 'sortListed' },


     

  ];
  }
  updateStatus(id:any){
// this._JobListApiService.editStudentStatus(id)
  }
  openStatus(){
    this.editDialog=true
  }
  statusChange(e:any,id:any){
    this.selectedStatus=e.value.value
    console.log(this.selectedStatus)
    const formData:any = new Object()
    formData.applicationStatus=this.selectedStatus
    this._JobListApiService.editStudentStatus(id,formData).subscribe({
      next:(res=>{

      console.log(res)  
      this.editDialog=false
      this._toast.showToaster.next({
        severity: 'success',
        summary: 'success',
        detail: res.message,
      });
    
    
    }),
    error: (err) => {
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail: err.error.message,
      });
    },
    })
  }
}
