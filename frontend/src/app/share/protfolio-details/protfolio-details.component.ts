import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface Ifield {
  title: string;
  desc: string;
  id:any,
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
  @Output() individualObj=new EventEmitter()
  uploadItem: any;
  selectedItem!: string;
  url: string = '';
  selectPdf: any;
  selectImg: any;
  selectVideo: any;
  pdfMaxSize: number = 26214400;
  ImgMaxSize: number = 12582912;
  videoMaxSize: number = 26214400;

  selectObj={
    title:'',
    id:'',
    desc:'',
    uploadedItm:[{
      pdf:{},
      img: [],
      video: [],
      url: '',
    }]
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
  pdfSelected(e: any, id: any) {
    console.log(e.target.files[0], id);
    if(e.target.files[0].size <= this.pdfMaxSize){
      this.obj.uploadedItm[0].pdf=e.target.files[0]
      console.log(this.obj)
      this.individualObj.emit(this.obj)
    }
else{
  alert('pdf size is to large')
}
    // const index = this.field.findIndex((item:any)=>{
    //   console.log(item.id,'mmm',id)
    //   item.id == id;
    // })
    // console.log(index)
    //     this.selectPdf = e.srcElement.files[0];
    //     if (this.selectPdf.size <= this.pdfMaxSize) {
    //       alert('ok..');
    //     } else {
    //       alert('error');
    //     }
  }
  imageSelected(e: any) {
    console.log(e.srcElement.files[0]);
    if (this.selectImg.size <= this.pdfMaxSize) {
      alert('ok..');
    } else {
      alert('error');
    }
  }
  videoSelected(e: any) {
    console.log(e.srcElement.files);
    if (this.selectVideo.size <= this.pdfMaxSize) {
      alert('ok..');
    } else {
      alert('error');
    }
  }
}
