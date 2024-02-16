import { Component, OnInit } from '@angular/core';
import { InternshipProfileService } from 'src/app/share/service/internship-profile.service';

@Component({
  selector: 'app-job-list-profile',
  templateUrl: './job-list-profile.component.html',
  styleUrls: ['./job-list-profile.component.scss']
})
export class JobListProfileComponent implements OnInit {

  constructor(private internshipProfileService:InternshipProfileService) { }
profileDetails!:any;
  ngOnInit(): void {
    this.internshipProfileService.sendInternshipProfileRequest().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.profileDetails=res.data
      }
    })
  }

}
