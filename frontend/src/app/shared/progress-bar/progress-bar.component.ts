import { Component, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarService } from 'src/app/service/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit,OnChanges {
  // progressValue:number = 90;
  isprogressVisible:boolean = true;
  response:boolean = false;
  // subscription:Subscription;
  constructor(private progress:ProgressBarService) { }

  ngOnInit(): void {
    this.progress.getProgressBar().subscribe((response)=>{
       this.response = response;
      console.log(response)
        this.response = true;
        // this.isprogressVisible  = response;
        console.log(this.response)
    })
  }

  ngOnChanges():void {
    console.log(this.response)
    this.isprogressVisible = this.response;
    console.log(this.isprogressVisible,'this.isprogressVisible')
  }

}
