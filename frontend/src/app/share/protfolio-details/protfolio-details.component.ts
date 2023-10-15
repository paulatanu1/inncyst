import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  pdfObj:any
  imgArray: any = [];
  urlArray: any[] = [{
    value:undefined
  }];
 urlValueArray:Array<string>=[]
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
  constructor() {}

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
      alert('iMAGE SIZE IS TO LARGE..');
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
    this.pdfObj=e.target.files[0];
    this.obj.uploadedItm[0].pdf = this.pdfObj
    console.log(this.obj);
  } else {
    alert('pdf size is to large');
  }
}

deletePdf() {
  this.pdfObj=''
  this.obj.uploadedItm[0].pdf =this.pdfObj
  this.obj.uploadedItm[0]
  console.log(this.obj);
}

//END PDF PORTION.........................................


//URL PORTION START......................

addUrl(){
  this.urlArray.push({value:''})
}
submitUrl(){
  this.urlValueArray = this.urlArray.map(input => input.value);
  console.log('Form values:', this.urlValueArray);
  this.obj.uploadedItm[0].url=this.urlValueArray;
  console.log(this.obj.uploadedItm[0].url)
}

removeUrl(i:number){
  this.urlValueArray.splice(i,1);
  this.urlArray.splice(i,1)
  this.obj.uploadedItm.url=this.urlValueArray;
  console.log(this.urlValueArray)
  console.log(this.obj.uploadedItm[0].url)
  
}

//END URL PORTION........................




  videoSelected(e: any) {
    console.log(e.srcElement.files);
    if (this.selectVideo.size <= this.pdfMaxSize) {
      alert('ok..');
    } else {
      alert('error');
    }
  }



  //UPLOAD PROTFOLIO TO THE SERVER....................................
  UploadProtfolio(text: any, desc: any) {
    this.obj.title = text;
    this.obj.desc = desc;
    console.log(this.obj);
    this.individualObj.emit()
  }

  //REMOVE SINGLE PROTFOLIO.............................................
  removeObj() {
    this.id.emit(this.obj.id);
  }
 
}
