import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { PortfolioService } from '../service/portfolio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
interface Ifield {
  title: string;
  description: string;
  id: any;
 uploadedItm: [
    {
      pdf: {};
      img: {};
  
      url: string;
      youtubeUrl:string;
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
  myForm!:FormGroup;
  urlValueArray: Array<string> = [];
  selectObj = {
    title: '',
    id: '',
    description: '',
   
        pdf: {},
        image: {},
        video: [],
        url: '',
        youtubeUrl:''
   
  };
  urlValue:string=''
  youtubeVideoValue:string=''
  constructor(private _toast:ToastServiceService,private portfolio:PortfolioService,private fb:FormBuilder) {}

  ngOnInit(): void {

    this.myForm=this.fb.group({
      title:[''],
      description:[''],
      // url:[''],
      // image:[{}],
      // pdf:[{}]
    })
    console.log(this.obj);

    this.uploadItem = [
      { name: 'Pdf' },
      { name: 'Image' },
      { name: 'url' },
      {name:'youtubeVideo'}
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

    // const formData: any = new FormData();
    // Object.keys(this.obj).forEach(key=>{
    //   // console.log(this.obj[key],'ky')
    //   formData.append(key,this.obj[key])
    //   // for (var pair of formData.entries()) {
    //   //   console.log(pair[0] + ': ' + pair[1]);
    //   // }
    // })
const formData = new FormData()
formData.append('title','abc')
formData.append('description','def')
    this.portfolio.addPortfolio(formData).subscribe({
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
  onSubmit(){
    console.log(this.myForm.value)
    const formData = new FormData();
    Object.keys(this.myForm.controls).forEach(key=> formData.append(key,this.myForm.get(key)?.value))
    // formData.append('title',this.myForm.value.title)
    // formData.append('description',this.myForm.value.description)
this.portfolio.addPortfolio(formData).subscribe({
  next:(res=>{
    console.log(res,'121')
  })
})
  }

  //youtube url
  youtubeUrlChange(e:any){
    console.log(e.target.value,'e')
    this.obj.youtubeUrl=e.target.value;
    console.log(this.obj)
  }
}
