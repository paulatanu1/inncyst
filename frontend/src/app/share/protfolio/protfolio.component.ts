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
      id:currentTime,
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
  
  addField() {
    const currentTime = new Date().getTime();
    this.field.push({
      title: '',
      desc: '',
      id:currentTime,
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
  getObj(e:any){
console.log(e)
this.field.push(e)
console.log(this.field,'f')
  }
}
