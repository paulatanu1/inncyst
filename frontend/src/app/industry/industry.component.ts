import { Component, OnInit } from '@angular/core';
import { ProfileService } from './jobs-management/jobs-management-service/profile.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss'],
})
export class IndustryComponent implements OnInit {
  loading = false;
  constructor(private _ProfileService: ProfileService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.loading = true;
    this._ProfileService.getProfile().subscribe({
      next: (res) => {
        if (res.data.image) {
          this._ProfileService.profileImage.next(res.data.image);
        }
      },
      error: (err) => {},
    });
  }
}
