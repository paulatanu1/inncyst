import { Component, OnInit } from '@angular/core';
import { InternshipProfileService } from '../service/internship-profile.service';
import { Subscription } from 'rxjs';

interface IprofileDetails {
  name: string;
  email: string;
  phone: string;
  image: null;
  role: string;
  verified: boolean;
  question_step: boolean;
  status: boolean;
  createdAt: string;
}
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  ProfileDetails!: IprofileDetails;
  profile: Subscription | undefined;
  constructor(private internship: InternshipProfileService) {}

  ngOnInit(): void {
    this.profile = this.internship
      .sendInternshipProfileRequest()
      .subscribe((response) => {
        this.ProfileDetails = response.data;
        console.log(this.ProfileDetails);
      });
  }

  ngOnDestroy() {
    this.profile?.unsubscribe();
  }
}
