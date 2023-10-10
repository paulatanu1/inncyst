import { Component, OnInit } from '@angular/core';
interface Ifield {
  title: string;
  desc: string;
  id:any,
  uploadedItm: [
    {
      pdf: [];
      img: [];
      video: [];
      url: string;
    }
  ];
}
@Component({
  selector: 'app-protfolio',
  templateUrl: './protfolio.component.html',
  styleUrls: ['./protfolio.component.scss'],
})
export class ProtfolioComponent implements OnInit {

  protfolioVissable: boolean = false;

  uploadItem: any;
  selectedItem: any;
  url: string = '';
  selectPdf: any;
  selectImg: any;
  selectVideo: any;
  pdfMaxSize: number = 26214400;
  ImgMaxSize: number = 12582912;
  videoMaxSize: number = 26214400;
  // fieldObj: Ifield 
  field: Ifield[] = [];
  id=0
  // constructor() {}
  addProtfolio() {
    this.protfolioVissable = !this.protfolioVissable;
  }
  ngOnInit(): void {
    const currentTime = new Date().getTime();

    this.field.push({
      title: '',
      desc: '',
      id:this.id,
      uploadedItm: [
        {
          pdf: [],
          img: [],
          video: [],
          url: '',
        },
      ],
    })
    this.uploadItem = [
      { name: 'Pdf' },
      { name: 'Image' },
      { name: 'video' },
      { name: 'url' },
    ];
  }
  selectItem(e: any,id:number) {
    this.selectedItem = e.value.name;
    console.log(id)
    // console.log(this.selectedItem);
  }
  pdfSelected(e:any,id:any) {
    const index = this.field.findIndex((item:any)=>{
      console.log(item.id,'mmm',id)
      item.id == id;
    })
console.log(index)
    this.selectPdf = e.srcElement.files[0];
    if (this.selectPdf.size <= this.pdfMaxSize) {
      alert('ok..');
    } else {
      alert('error');
    }
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
  addField() {
    const currentTime = new Date().getTime();
    this.field.push({
      title: '',
      desc: '',
      id:this.id+1,
      uploadedItm: [
        {
          pdf: [],
          img: [],
          video: [],
          url: '',
        },
      ],
    })
  }
}
