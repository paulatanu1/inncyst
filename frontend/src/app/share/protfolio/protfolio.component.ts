import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { PortfolioService } from '../service/portfolio.service';
import { environment } from 'src/environments/environment';
// import * as MediaElementPlayer from 'mediaelement';
interface Ifield {
  title: string;
  description: string;
  id: any;
  pdf: {};
  image: {};
  url: string;
  youtubeUrl:string;
}
@Component({
  selector: 'app-protfolio',
  templateUrl: './protfolio.component.html',
  styleUrls: ['./protfolio.component.scss'],
})
export class ProtfolioComponent implements OnInit ,AfterViewInit {
  constructor(
    private _toast: ToastServiceService,
    private portfolio: PortfolioService,private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    // const videoElement = this.elementRef.nativeElement.querySelector('#my-video');
    // const player = new MediaElement(videoElement);
  }
  urrl='https://www.youtube.com/embed/6q9NtaWYbBk'
  protfolioVissable: boolean = false;
  display: boolean = false;
  resizable = true;
  currentTime = new Date().getTime();
  portfolioDetails:any=[
    {
      title:undefined,
      description: undefined,
      id: this.currentTime,

      pdf: undefined,
      image: undefined,
      url:undefined,
      youtubeUrl:undefined,
    }
  ]
  commonYoutubeUrl="https://www.youtube.com/embed/";
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
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
        youtubeUrl:''
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
      youtubeUrl:''
    });
    console.log(this.field);

    // 1st time call all portfolio details.......
 this.getPortfolio();
  }
  getPortfolio(){
    this.portfolio.getPortfolio().subscribe({
      next: (res) => {
        this.portfolioDetails=res.data
        console.log(this.portfolioDetails, 'res2');
        this.portfolioDetails.forEach((item:any)=>{
        // alert('kk')
        //  const newUrl:any= item.url.split('=')[1] || null;
        //  item.url=this.commonYoutubeUrl+newUrl
         item.image=environment.API_URL+item.image;
         item.pdf=environment.API_URL+item.pdf;
         item.youtubeUrl=item.youtubeUrl?.split('=')[1];
        //  console.log(this.portfolioDetails,'jjjjj')
        // let newYoutubeUrl:any=item.youtubeUrl

        //  const a:any=newYoutubeUrl?.split('=')[1]
        // //  console.log(a,'ka')
        // item.youtubeUrl=a
        })
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
      youtubeUrl:''
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
        youtubeUrl:''
      },
    ];
  }

  editPortfolio(){

  }
  deletePortfolio(id:any){
    this.portfolio.deletePortFolio(id).subscribe({
      next:(res=>{
        console.log(res)
        this.getPortfolio();
      })
    })

  }
}
