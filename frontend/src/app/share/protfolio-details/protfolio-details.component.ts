import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { PortfolioService } from '../service/portfolio.service';
interface Ifield {
  title: string;
  description: string;
  id: any;
 uploadedItm: [
    {
      pdf: {};
      img: {};
  
      url: string;
    }
  ];
}
@Component({
  selector: 'app-protfolio-details',
  templateUrl: './protfolio-details.component.html',
  styleUrls: ['./protfolio-details.component.scss'],
})
export class ProtfolioDetailsComponent implements OnInit {
  @Input() obj: any;
  desc!: string;
  @Output() individualObj = new EventEmitter();
  @Output() id = new EventEmitter();
  uploadItem: any;
  selectedItem!: string;
  url: string = '';
  selectPdf: any;
  selectImg: any;
  selectVideo: any;
  pdfMaxSize: number = 26214400;
  ImgMaxSize: number = 12582912;
  videoMaxSize: number = 26214400;
  pdfObj={};
  imgObj={};
  VideofileInput!:any
  videoInput!: File | null;
  ImagefileInput!:any
  PdffileInput!:any
  urlArray={}
  urlValueArray: Array<string> = [];
  selectObj = {
    title: '',
    id: '',
    description: '',
   
        pdf: {},
        image: {},
        video: [],
        url: '',
   
  };
  urlValue:string=''
  constructor(private _toast:ToastServiceService,private portfolio:PortfolioService) {}

  ngOnInit(): void {
    console.log(this.obj);

    this.uploadItem = [
      { name: 'Pdf' },
      { name: 'Image' },
      { name: 'url' },
    ];
  }
  selectItem(e: any, id: number) {
    this.selectedItem = e.value.name;
    console.log(e.value.name);
    console.log(this.selectedItem);
  }

  //IMAGE UPLOAD START...................................................
  onImageSelected(e: any) {
    if (e.target.files[0].size <= this.ImgMaxSize) {
      this.imgObj = e.target.files[0];
      // this.imgArray[index] = file;
      this.obj.image = this.imgObj;
      console.log(this.obj);
    } else {
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail: "Upload failed: File size too big..you can upload files within 12 MB"
      });
         }
  }
  removeImage() {
    this.ImagefileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (this.ImagefileInput) {
      this.ImagefileInput.value = '';
    }
    this.imgObj={}
    this.obj.image={}
    // this.imgArray.splice(i, 1);
    // this.obj.image = this.imgArray;
    console.log(this.obj);
  }
  // addImage() {
  //   this.imgArray.push(null);
  // }
  //END IMAGE PORTION........................................................

  //PDF PORTION START.......................................

  pdfSelected(e: any) {
    if (e.target.files[0].size <= this.pdfMaxSize) {
      this.pdfObj = e.target.files[0];
      this.obj.pdf = this.pdfObj;
      console.log(this.obj);
    } else {
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail: "Upload failed: File size too big..you can upload files within 25 MB"
      });
    }
  }

  deletePdf() {
    this.PdffileInput = document.getElementById('pdfInput') as HTMLInputElement;
    if (this.PdffileInput) {
      this.PdffileInput.value = '';
    }
    this.pdfObj = '';
    this.obj.pdf = this.pdfObj;
    // this.obj.uploadedItm[0];
    console.log(this.obj);
  }

  //END PDF PORTION.........................................

  //URL PORTION START......................
  urlChange(e:any){
    console.log(e.target.value,'e')
    this.obj.url=e.target.value;
    console.log(this.obj)
  }

  // addUrl() {
  //   this.urlArray.push({ value: '' });
  // }
  // submitUrl() {
  //   this.urlValueArray = this.urlArray.map((input) => input.value);
  //   console.log('Form values:', this.urlValueArray);
  //   this.obj.url = this.urlValueArray;
  // }

  // removeUrl(i: number) {
  //   this.urlValueArray.splice(i, 1);
  //   this.urlArray.splice(i, 1);
  //   this.obj.url = this.urlValueArray;
  // ;
  // }

  //END URL PORTION........................

  //VIDEO PORTION START..............................

  videoSelected(e: any) {
    console.log(e,'e')
    if (e.target.files[0].size <= this.videoMaxSize) {
      let input: any = e.target as HTMLInputElement;
      this.videoInput = input?.files[0];
      
    } else {
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail: "Upload failed: File size too big..you can upload files within 12MB"
      });
    }
  }
  removeVideo() {
    this.videoInput = null;
    this.VideofileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (this.VideofileInput) {
      this.VideofileInput.value = '';
    }
  }
  // VIDEO PORTION END..............................

  //UPLOAD PROTFOLIO TO THE SERVER....................................
  UploadProtfolio(text: any) {
    this.obj.title = text;
    this.obj.description = this.desc;
    console.log(this.obj,'this.obj');
    this.individualObj.emit();
    this.portfolio.addPortfolio(this.obj).subscribe({
      next:(item=>{
      console.log(item)
      }),
      error:(err=>{
        console.log(err)
        this._toast.showToaster.next({
          severity: 'Error',
          summary: 'Error',
          detail: err.error.message
        });
      })
    }
  )
  }

  //REMOVE SINGLE PROTFOLIO.............................................
  removeObj() {
    this.id.emit(this.obj.id);
  }

}
