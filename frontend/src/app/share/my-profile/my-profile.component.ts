import { Component, OnInit } from '@angular/core';
import { InternshipProfileService } from '../service/internship-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']

})
export class MyProfileComponent implements OnInit {
  
  constructor(private internship:InternshipProfileService) { }
 
  ngOnInit(): void {
  
this.internship.sendInternshipProfileRequest() .subscribe((response)=>{
  console.log(response)
})

  }

}
