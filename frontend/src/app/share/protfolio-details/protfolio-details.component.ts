import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
      youtubeUrl: string;
    }
  ];
  portfolioStatus: string;
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
  portfolioStatusOption: any;
  selectedPortfolioStatus: any;
  selectedItem!: string;
  url: string = '';
  selectPdf: any;
  selectImg: any;
  selectVideo: any;
  pdfMaxSize: number = 26214400;
  ImgMaxSize: number = 12582912;
  videoMaxSize: number = 26214400;
  pdfObj = {};
  imgObj = {};
  VideofileInput!: any;
  videoInput!: File | null;
  ImagefileInput!: any;
  PdffileInput!: any;
  urlArray = {};
  myForm!: FormGroup;
  urlValueArray: Array<string> = [];
  loading=false
  selectObj = {
    title: '',
    id: '',
    description: '',

    pdf: {},
    image: {},
    video: [],
    url: '',
    youtubeUrl: '',
    portfolioStatus: '',
  };
  urlValue: string = '';
  youtubeVideoValue: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private _toast: ToastServiceService,
    private portfolio: PortfolioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: [''],
      description: [''],
      image: [{}],
      pdf: [{}],
      url: [''],
      youtubeUrl: [''],
      selectedItem: [],
    });

    this.uploadItem = [
      { name: 'Pdf' },
      { name: 'Image' },
      { name: 'url' },
      { name: 'youtubeVideo' },
    ];
    this.portfolioStatusOption = [
      { name: 'Ongoing', value: 'ongoing' },
      { name: 'Completed', value: 'complete' },
    ];
  }
  selectItem(e: any, id: number) {
    // this.myForm.get('selectedItem')?.patchValue(e.value.name);
    // console.log(e.value.name);
this.selectedItem = e.value.name;
    // console.log(this.myForm.value.selectedItem);
  }
  selectItemPortfolio(e: any, id: number) {
    this.selectedPortfolioStatus = e.value.value;
  }

  //IMAGE UPLOAD START...................................................
  onImageSelected(e: any) {
    if (e.target.files[0].size <= this.ImgMaxSize) {
      this.imgObj = e.target.files[0];
      // this.imgArray[index] = file;
      // this.obj.image = this.imgObj;
      this.myForm.get('image')?.setValue(this.imgObj);
    } else {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail:
          'Upload failed: File size too big..you can upload files within 12 MB',
      });
    }
  }
  removeImage() {
    this.ImagefileInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement;
    if (this.ImagefileInput) {
      this.ImagefileInput.value = '';
    }
    this.imgObj = {};
    this.obj.image = {};
    // this.imgArray.splice(i, 1);
    // this.obj.image = this.imgArray;
  }
  // addImage() {
  //   this.imgArray.push(null);
  // }
  //END IMAGE PORTION........................................................

  //PDF PORTION START.......................................

  pdfSelected(e: any) {
    const selectedFile = e.target.files[0];
    if (selectedFile.size <= this.pdfMaxSize) {
      this.pdfObj = selectedFile;

      // Don't attempt to set the value of the file input here

      // Optionally, update the form control value
      this.myForm.patchValue({ pdf: this.pdfObj });

      // Perform any other actions with this.pdfObj if needed
    } else {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail:
          'Upload failed: File size too big. You can upload files within 25 MB',
      });

      // Reset the file input to clear the selected file
      this.fileInput.nativeElement.value = '';
    }
  }

  deletePdf() {
    this.PdffileInput = document.getElementById('pdfInput') as HTMLInputElement;
    if (this.PdffileInput) {
      this.PdffileInput.value = '';
    }
    this.pdfObj = '';
    // this.obj.pdf = this.pdfObj;
    this.myForm.get('pdf')?.setValue(null);
    // this.obj.uploadedItm[0];
  }

  //END PDF PORTION.........................................

  //URL PORTION START......................
  urlChange(e: any) {
    // this.obj.url = e.target.value;
    this.myForm.get('url')?.setValue(e.target.value);
  }

  //END URL PORTION........................

  //VIDEO PORTION START..............................

  videoSelected(e: any) {
    if (e.target.files[0].size <= this.videoMaxSize) {
      let input: any = e.target as HTMLInputElement;
      this.videoInput = input?.files[0];
    } else {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail:
          'Upload failed: File size too big..you can upload files within 12MB',
      });
    }
  }
  removeVideo() {
    this.videoInput = null;
    this.VideofileInput = document.getElementById(
      'fileInput'
    ) as HTMLInputElement;
    if (this.VideofileInput) {
      this.VideofileInput.value = '';
    }
  }
  // VIDEO PORTION END..............................

 
  //REMOVE SINGLE PROTFOLIO.............................................
  removeObj() {
    this.id.emit(this.obj.id);
  }
    //UPLOAD PROTFOLIO TO THE SERVER....................................
  onSubmit(){
    this.loading=true;

    const formData = new FormData();
    // Object.keys(this.myForm.controls).forEach(key=> formData.append(key,this.myForm.get(key)?.value))
    formData.append('title',this.myForm.value.title)
    formData.append('description',this.myForm.value.description)
    formData.append('pdf',this.myForm.value.pdf)
    formData.append('image',this.myForm.value.image)
    formData.append('url',this.myForm.value.url)
    formData.append('youtubeUrl',this.myForm.value.youtubeUrl)
    formData.append('portfolioStatus',this.selectedPortfolioStatus)
this.portfolio.addPortfolio(formData).subscribe({
  next:(res=>{
    this.loading=false;
    this.portfolio.hideAddPortfolioModal.next(false)
    this._toast.showToaster.next({
      severity: 'success',
      summary: 'success',
      detail: res.message,
    });

  }
  ),
error:(er)=>{
  this.loading=false;
  this._toast.showToaster.next({
    severity: 'error',
    summary: 'error',
    detail: er.error.message,
  });

}
})
  }
  youtubeUrlConvert(url: any) {
    let regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;

    var match = url.match(regExp);

    return match && match[1].length == 11 ? match[1] : false;
  }
  //youtube url start
  youtubeUrlChange(e: any) {
    let originalFileUrl = e.target.value;
    let url = this.youtubeUrlConvert(originalFileUrl);

    if (url != false) {
      this.myForm
        .get('youtubeUrl')
        ?.setValue(`https://www.youtube-nocookie.com/embed/${url}`);
    }
  }
}
