import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-resume-step',
  templateUrl: './upload-resume-step.component.html',
  styleUrls: ['./upload-resume-step.component.scss']
})
export class UploadResumeStepComponent implements OnInit {
  opt:string='1';
  constructor() { }

  ngOnInit(): void {
  }

}
