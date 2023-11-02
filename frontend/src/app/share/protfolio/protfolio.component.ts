import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { PortfolioService } from '../service/portfolio.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
// import * as MediaElementPlayer from 'mediaelement';
interface Ifield {
  title: string;
  description: string;
  id: any;
  pdf: {};
  image: {};
  url: string;
  youtubeUrl: string;
}
@Component({
  selector: 'app-protfolio',
  templateUrl: './protfolio.component.html',
  styleUrls: ['./protfolio.component.scss'],
})
export class ProtfolioComponent implements OnInit, AfterViewInit {
  constructor(
    private _toast: ToastServiceService,
    private portfolio: PortfolioService,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    // const videoElement = this.elementRef.nativeElement.querySelector('#my-video');
    // const player = new MediaElement(videoElement);
  }
  urrl = 'https://www.youtube.com/embed/6q9NtaWYbBk';
  protfolioVissable: boolean = false;
  display: boolean = false;
  resizable = true;
  currentTime = new Date().getTime();
  editDialog: boolean = false;
  editDialogForm!: FormGroup;
  editImage = '';
  editPdf = '';
  pdfMaxSize: number = 26214400;
  ImgMaxSize: number = 12582912;
  pdfObj = {};
  imgObj = {};
  editPortfolioId!: number;

  portfolioDetails: any = [
    {
      title: undefined,
      description: undefined,
      id: this.currentTime,

      pdf: undefined,
      image: undefined,
      url: undefined,
      youtubeUrl: undefined,
    },
  ];
  commonYoutubeUrl = 'https://www.youtube.com/embed/';
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  closeDialog() {
    this.display = false;
    this.field = [
      {
        title: '',
        description: '',
        id: this.currentTime,

        pdf: {},
        image: {},
        url: '',
        youtubeUrl: '',
      },
    ];
  }
  // fieldObj: Ifield
  field: Ifield[] = [];
  id = 0;
  addProtfolio() {
    // this.protfolioVissable = !this.protfolioVissable;
    this.display = true;
    // this.addField();
  }
  ngOnInit(): void {


    //when add submit then modal will be automatically close
    this.portfolio.hideAddPortfolioModal.subscribe({
      next:(res=>{
        this.display=res as unknown as boolean
        console.log(res)
        this.getPortfolio()
      })
    })
    console.log(this.field, 'this');
    const currentTime = new Date().getTime();

    this.field.push({
      title: '',
      description: '',
      id: currentTime,

      pdf: {},
      image: {},
      url: '',
      youtubeUrl: '',
    });
    console.log(this.field);

    // 1st time call all portfolio details.......
    this.getPortfolio();

    //editDialogForm
    this.editDialogForm = this.fb.group({
      title: [''],
      description: [''],
      image: [{}],
      pdf: [{}],
      url: [''],
      youtubeUrl: [''],
    });
  }
  getPortfolio() {
    this.portfolio.getPortfolio().subscribe({
      next: (res) => {
        this.portfolioDetails = res.data;
        console.log(this.portfolioDetails, 'res2');
        this.portfolioDetails.forEach((item: any) => {
          // alert('kk')
          //  const newUrl:any= item.url.split('=')[1] || null;
          //  item.url=this.commonYoutubeUrl+newUrl
          item.image = environment.API_URL + item.image;
          item.pdf = environment.API_URL + item.pdf;
          //  item.youtubeUrl=item.youtubeUrl?.split('=')[1];
          //  console.log(this.portfolioDetails,'jjjjj')
          // let newYoutubeUrl:any=item.youtubeUrl

          //  const a:any=newYoutubeUrl?.split('=')[1]
          // //  console.log(a,'ka')
          // item.youtubeUrl=a
        });
      },
    });
  }

  addField() {
    const currentTime = new Date().getTime();
    this.field.push({
      title: '',
      description: '',
      id: currentTime,

      pdf: {},
      image: {},
      url: '',
      youtubeUrl: '',
    });
  }
  getObj(e: any) {
    console.log(this.field, 'f');
  }

  deletedObjId(e: any) {
    const formIndex = this.field.findIndex((data) => data.id === e);

    if (formIndex !== -1) {
      this.field.splice(formIndex, 1);

    }
  }
  // getProtfolio() {
  //   this.portfolio.getPortfolio().subscribe({
  //     next: (res) => {
  //       console.log(res, 'res2');
  //     },
  //   });
  // }
  handleDialogHide() {
    this.field = [
      {
        title: '',
        description: '',
        id: this.currentTime,

        pdf: {},
        image: {},
        url: '',
        youtubeUrl: '',
      },
    ];
    this.getPortfolio()
  }

  editPortfolio(id: any) {
    this.editDialog = true;
    this.editPortfolioId = id;
    // this.editDialogForm.setValue(this.)
    this.portfolio.getSinglePortfolio(id).subscribe({
      next: (res) => {
        this.editDialogForm.get('title')?.patchValue(res.data.title);
        this.editDialogForm.get('description')?.setValue(res.data.description);
        this.editDialogForm.get('url')?.setValue(res.data.url);
        this.editDialogForm.get('youtubeUrl')?.setValue(res.data.youtubeUrl);
        this.editDialogForm.get('image')?.setValue(res.data.image);
        this.editDialogForm.get('pdf')?.setValue(res.data.pdf);
        this.editImage = res.data.image?.split('-')[2];
        this.editPdf = res.data.pdf?.split('-')[2];

      },
    });
  }
  onHideEditDialog() {
    this.editDialog = false;
  }
  removeImg() {
    this.editImage = '';
    this.editDialogForm.get('image')?.setValue(null);
  }
  onImageSelected(e: any) {
    if (e.target.files[0].size <= this.ImgMaxSize) {
      this.imgObj = e.target.files[0];
      this.editDialogForm.get('image')?.setValue(this.imgObj);
    } else {
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail:
          'Upload failed: File size too big..you can upload files within 12 MB',
      });
    }
  }

  removePdf() {
    this.editPdf = '';
    this.editDialogForm.get('pdf')?.setValue(null);
  }
  pdfSelected(e: any) {
    if (e.target.files[0].size <= this.pdfMaxSize) {
      this.pdfObj = e.target.files[0];
      this.editDialogForm.get('pdf')?.setValue(this.pdfObj);
    } else {
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail:
          'Upload failed: File size too big..you can upload files within 25 MB',
      });
    }
  }

  urlChange(e: any) {
    this.editDialogForm.get('url')?.setValue(e.target.value);
  }

  onSubmit() {
    console.log(this.editDialogForm.value);
    const formData = new FormData();
    Object.keys(this.editDialogForm.controls).forEach((key) =>
      formData.append(key, this.editDialogForm.get(key)?.value)
    );
    // Object.keys(this.editDialogForm.controls).forEach(key=>formData.append(key,this.editDialogForm.get(key)?.value))
    console.log(formData);
    this.portfolio.editPortfolio(this.editPortfolioId, formData).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
  deletePortfolio(id: any) {
    this.portfolio.deletePortFolio(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getPortfolio();
      },
    });
  }
}
