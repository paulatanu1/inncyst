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
              item.portfolioData.image = environment.API_URL + item.portfolioData.image;
              item.portfolioData.pdf = environment.API_URL + item.portfolioData.pdf;
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
  // youtubeUrlConvert(url:any){
  //   let regExp=/^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  
  //   var match = url.match(regExp);
  
  //   return match && match[1].length == 11 ? match[1] : false;
  // }
  // youtubeUrlChange(e:any){
  //   let originalFileUrl=e.target.value
  //   let url=this.youtubeUrlConvert(originalFileUrl)
    
  //   if(url != false){
  //     this.editDialogForm.get('youtubeUrl')?.setValue(`https://www.youtube-nocookie.com/embed/${url}`)
  //   }
  //  }
}
