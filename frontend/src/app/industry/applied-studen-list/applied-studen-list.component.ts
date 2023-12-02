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
studentPortfolioData:any=[]
  constructor(private activatedRoute:ActivatedRoute, private _JobListApiService:JobListApiService,private _toast:ToastServiceService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe({
      next:res=>{
        if(res['id']){
        this._JobListApiService.getAppliedStudent(res['id']).subscribe({
          next:(res=>{
            this.studentListData=res.data
            this.studentPortfolioData=res.data[0].portfolioData

            console.log(this.studentPortfolioData)
            this.studentListData.forEach((item:any,index:any)=>{
              console.log(item.userId)
              console.log(item.userId.image)
              // let img='/'+item.userId.image.split('/').slice(-1)
              // console.log(img)
              // item.userId.image = environment.API_URL + img;
              // item.resume = environment.API_URL + item.resume;

            })
            console.log(this.studentListData)
            this.studentPortfolioData.forEach((item:any)=>{
              item.pdf = environment.API_URL + item.pdf;
              item.image = environment.API_URL + item.image;
              let youtubeEndPonint=item.youtubeUrl?.split('/').slice(-1)
              // console.log(youtubeEndPonint)
              if(youtubeEndPonint !== undefined && youtubeEndPonint[0] !== ''){

                item.youtubeUrl='https://www.youtube-nocookie.com/embed/'+youtubeEndPonint;
                console.log(item.youtubeUrl)
              }
              // console.log(item.youtubeUrl)
            })
          })
        })
      }
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
