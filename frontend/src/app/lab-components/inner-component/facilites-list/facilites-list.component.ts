import { Component, OnInit } from '@angular/core';
import { LabLoginRegService } from 'src/app/lab-services/lab-login-reg.service';

@Component({
  selector: 'app-facilites-list',
  templateUrl: './facilites-list.component.html',
  styleUrls: ['./facilites-list.component.scss'],
})
export class FacilitesListComponent implements OnInit {
  constructor(private labService: LabLoginRegService) {}

  ngOnInit(): void {
    this.getFacilityList();
  }

  getFacilityList() {
    this.labService.labFacilityList().subscribe({
      next: (res) => {
        console.log(res, 'list');
      },
    });
  }
}
