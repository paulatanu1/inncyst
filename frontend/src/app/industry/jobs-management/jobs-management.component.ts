import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common-service/api.service';
import { JobPostListService } from './jobs-management-service/job-post-list.service';
import { JobListApiService } from './posts/job-list-api.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { InputTextModule } from 'primeng/inputtext';
import { SelectItem } from 'primeng/api';

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
  sortOptions: SelectItem[] = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
  ];
  sortOrder!: number;
  sortField!: string;
  sortKey!: string;
  searchValue: string = '';
  postList: any = [];
  visible: boolean = false;
  status!: City[];
  editedJobId!: any;
  selectedStatus!: City;
  jobStatus: boolean = false;
  page = 0;
  limit = 10;
  totalItem!: number;
  loading: boolean = false;
  jobTitle!: any;
  query = '';
  filterBy = '';
  constructor(
    private _menuHandel: LeftMenuHandelService,
    private router: Router,
    private post: JobPostListService,
    private _JobListApiService: JobListApiService,
    private _toast: ToastServiceService
  ) {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll1(event: Event): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.totalItem > this.postList.length) {
        this.page = this.page + 1;
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
    this.loading = true;
    this.post
      .getPostList(this.page, this.limit, this.query, this.filterBy)
      .subscribe({
        next: (res) => {
          this.totalItem = res.data.total;
          this.postList = [...this.postList, ...res.data.items];
          // this.postList=this.postList.push(...res.data.items)
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  addJobs() {
    this.router.navigate(['/industry/jobs/add-job']);
  }
  edit(id: number, type: string) {
    // alert(id)
    // console.log(data)
    this.router.navigate(['/industry/jobs/add-job'], {
      queryParams: { id: id, type: type },
    });
  }
  delete(id: any, index: any) {
    this.postList.splice(index, 1);
    this.post.deletePortFolio(id).subscribe({
      next: (res) => {
        // this.postList=[]
        // this.router.navigate(['/industry/jobs'])
        // this.getJobList()
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
      },
      error: (err) => {
        // this.getJobList()
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      },
    });
  }
  onScroll() {
    if (this.totalItem >= this.postList.length) {
      this.page = this.page + 1;
      this.getJobList();
    }
  }
  editStatus(id: any, title: any) {
    this.visible = true;
    this.editedJobId = id;
    this.jobTitle = title;
  }
  statusChange(e: any) {
    this.selectedStatus = e.value.value;
    const formData: any = new Object();
    formData.status = this.selectedStatus;
    this.post.editStatus(formData, this.editedJobId).subscribe({
      next: (res) => {
        this.visible = false;
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
      },
      error: (err) => {
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      },
    });
  }

  studentList(id: any) {
    this.router.navigate(['/industry/appliedStudentList'], {
      queryParams: { id: id },
    });
  }
  onSortChange(event: any) {
    let value = event.value;
    if (value) {
      this.filterBy = value;
      this.page = 0;
      this.postList = [];
      this.getJobList();
    }
  }

  searchJob(): void {
    // Triggered on each input change
    // You can perform additional actions here if needed
    this.validateSearchInput();
  }

  validateSearchInput(): void {
    // Customize the validation logic based on your requirements
    // const pattern = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;
    if (this.query) {
      // Validation failed: leading space detected
      // You can handle this case, e.g., by removing leading spaces
      // this.query = this.query.trimStart();
      this.page = 0;
      this.postList = [];
      this.getJobList();
    }
  }
}
