import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from '../service/progress-bar.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private progress:ProgressBarService) { }

  ngOnInit(): void {
    
  }

}
