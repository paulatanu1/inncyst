import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common-service/api.service';
import { JobPostListService } from './jobs-management-service/job-post-list.service';
import { JobListApiService } from './posts/job-list-api.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
interface City {
  name: string;
  value: string;
}
@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobsManagementComponent implements OnInit {
  postList:any=[]
  visible: boolean = false;
  status!: City[];
editedJobId!:any
  selectedStatus!: City ;
jobStatus:boolean=false;
page=0;
limit=10;
totalItem!:number
loading:boolean=false;
  constructor(
    private _menuHandel: LeftMenuHandelService,
    private router: Router,
    private post: JobPostListService,
    private _JobListApiService: JobListApiService,
    private _toast: ToastServiceService,
    
  ) {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll1(event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if(this.totalItem > this.postList.length){
        console.log(this.totalItem,this.postList.length)
        console.log('scrol,,,,,,,,,,,',event);
        this.page=this.page+1;
        this.getJobList();

      }
    }
  }

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(1);
    this.getJobList();
    window.scrollTo(0, 0);

    this.status = [
      { name: 'Published ', value: 'true' },
      { name: 'Not Published', value: 'false' },   
  ];
  }

  getJobList() {
    this.loading=true;
    this.post.getPostList(this.page,this.limit).subscribe({
      next: (res) => {
        console.log(res)
        this.totalItem=res.data.total;
        console.log(this.totalItem)
        this.postList = [...this.postList,...res.data.items];
        // this.postList=this.postList.push(...res.data.items)
        console.log(this.postList)
        console.log(res.data.items)
        this.loading=false
        console.log(this.postList, this.postList.length);
      },
      error:(err)=>{
        this.loading=false
      }
    });
  }

  addJobs() {
    this.router.navigate(['/industry/jobs/add-job']);
  }
  edit(id: number,type:string) {
    // alert(id)
    // console.log(data)
    console.log(id,type,'jjj')
    this.router.navigate(['/industry/jobs/add-job'], {
      queryParams: { id: id ,type:type},
    });
  }
  delete(id: any) {
    console.log(id);
    this.post.deletePortFolio(id).subscribe({
      next: (res) => {
      
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        this.getJobList()
      },
      error: (err) => {
        this._toast.showToaster.next({
          severity: 'Error',
          summary: 'Error',
          detail: err.error.message,
        });
        this.getJobList()
      },
    });
  }
  onScroll(){
    console.log('scrol...........')
    if(this.totalItem >= this.postList.length){
      console.log(this.totalItem,this.postList.length)
      console.log('scrol,,,,,,,,,,,',event);
      this.page=this.page+1;
      this.getJobList();

    }
  }
  editStatus(id:any){
    this.visible=true
   this.editedJobId=id
  
  }
  statusChange(e:any){
    this.selectedStatus=e.value.value
    console.log(this.editedJobId,this.selectedStatus)
    const formData:any = new Object()
    formData.status=this.selectedStatus
    this.post.editStatus(formData,this.editedJobId).subscribe({
      next:(res=>{

      console.log(res)  
      this.visible=false
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

  studentList(id:any){
console.log(id)
this.router.navigate(['/industry/appliedStudentList'],{queryParams:{id:id}})
  }
}
