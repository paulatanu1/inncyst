import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
interface Ifield {
  title: string;
  desc: string;
  id: any;
  uploadedItm: [
    {
      pdf: {};
      img: [];
      video: [];
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
  pdfObj: any;
  imgArray: any = [];
  VideofileInput!:any
  videoInput!: File | null;
  urlArray: any[] = [
    {
      value: undefined,
    },
  ];
  urlValueArray: Array<string> = [];
  selectObj = {
    title: '',
    id: '',
    desc: '',
    uploadedItm: [
      {
        pdf: {},
        img: [],
        video: [],
        url: [],
      },
    ],
  };
  constructor(private _toast:ToastServiceService) {}

  ngOnInit(): void {
    console.log(this.obj);

    this.uploadItem = [
      { name: 'Pdf' },
      { name: 'Image' },
      { name: 'video' },
      { name: 'url' },
    ];
  }
  selectItem(e: any, id: number) {
    this.selectedItem = e.value.name;
    console.log(e.value.name);
    console.log(this.selectedItem);
  }

  //IMAGE UPLOAD START...................................................
  onImageSelected(e: any, index: number) {
    if (e.target.files[0].size <= this.ImgMaxSize) {
      const file = e.target.files[0];
      this.imgArray[index] = file;
      this.obj.uploadedItm[0].img = this.imgArray;
      console.log(this.obj.uploadedItm);
    } else {
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail: "Upload failed: File size too big..you can upload files within 12 MB"
      });
         }
  }
  removeImage(i: number) {
    this.imgArray.splice(i, 1);
    this.obj.uploadedItm[0].img = this.imgArray;
    console.log(this.obj.uploadedItm);
  }
  addImage() {
    this.imgArray.push(null);
  }
  //END IMAGE PORTION........................................................

  //PDF PORTION START.......................................

  pdfSelected(e: any) {
    if (e.target.files[0].size <= this.pdfMaxSize) {
      this.pdfObj = e.target.files[0];
      this.obj.uploadedItm[0].pdf = this.pdfObj;
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
    this.pdfObj = '';
    this.obj.uploadedItm[0].pdf = this.pdfObj;
    this.obj.uploadedItm[0];
    console.log(this.obj);
  }

  //END PDF PORTION.........................................

  //URL PORTION START......................

  addUrl() {
    this.urlArray.push({ value: '' });
  }
  submitUrl() {
    this.urlValueArray = this.urlArray.map((input) => input.value);
    console.log('Form values:', this.urlValueArray);
    this.obj.uploadedItm[0].url = this.urlValueArray;
    console.log(this.obj.uploadedItm[0].url);
  }

  removeUrl(i: number) {
    this.urlValueArray.splice(i, 1);
    this.urlArray.splice(i, 1);
    this.obj.uploadedItm.url = this.urlValueArray;
    console.log(this.urlValueArray);
    console.log(this.obj.uploadedItm[0].url);
  }

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
  UploadProtfolio(text: any, desc: any) {
    this.obj.title = text;
    this.obj.desc = desc;
    console.log(this.obj);
    this.individualObj.emit();
  }

  //REMOVE SINGLE PROTFOLIO.............................................
  removeObj() {
    this.id.emit(this.obj.id);
  }
}
