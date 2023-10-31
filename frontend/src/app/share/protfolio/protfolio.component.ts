import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { PortfolioService } from '../service/portfolio.service';
interface Ifield {
  title: string;
  description: string;
  id: any;
  pdf: {};
  image: {};
  url: string;
}
@Component({
  selector: 'app-protfolio',
  templateUrl: './protfolio.component.html',
  styleUrls: ['./protfolio.component.scss'],
})
export class ProtfolioComponent implements OnInit {
  constructor(
    private _toast: ToastServiceService,
    private portfolio: PortfolioService
  ) {}
  protfolioVissable: boolean = false;
  display: boolean = false;
  resizable = true;
  currentTime = new Date().getTime();

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
      },
    ];
  }
  // fieldObj: Ifield
  field: Ifield[] = [];
  id = 0;
  // constructor() {}
  addProtfolio() {
    // this.protfolioVissable = !this.protfolioVissable;
    this.display = true;
    // this.addField();
  }
  ngOnInit(): void {
    console.log(this.field, 'this');
    const currentTime = new Date().getTime();

    this.field.push({
      title: '',
      description: '',
      id: currentTime,

      pdf: {},
      image: {},
      url: '',
    });
    console.log(this.field);
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
    });
  }
  getObj(e: any) {
    console.log(this.field, 'f');
  }

  deletedObjId(e: any) {
    const formIndex = this.field.findIndex((data) => data.id === e);

    if (formIndex !== -1) {
      this.field.splice(formIndex, 1);

      console.log(this.field);
    }
  }
  getProtfolio() {
    this.portfolio.getPortfolio().subscribe({
      next: (res) => {
        console.log(res, 'res2');
      },
    });
  }
  handleDialogHide() {
    this.field = [
      {
        title: '',
        description: '',
        id: this.currentTime,

        pdf: {},
        image: {},
        url: '',
      },
    ];
  }
}
