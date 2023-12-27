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

  ngOnInit(): void {}

  ngOnChanges():void {
    console.log(this.response)
    this.isprogressVisible = this.response;
    console.log(this.isprogressVisible,'this.isprogressVisible')
  }

}
