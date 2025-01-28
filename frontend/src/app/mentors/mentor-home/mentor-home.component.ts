import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  mentorName: string;
  mentorExpert: string;
  availMentor: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    mentorName: 'Helping Advanced JS',
    mentorExpert:
      'Here we learn JavaScript, starting from scratch and go on to advanced concepts like OOP.',
    availMentor: 'Success',
    action: 'H',
  },
];

@Component({
  selector: 'app-mentor-home',
  templateUrl: './mentor-home.component.html',
  styleUrls: ['./mentor-home.component.scss'],
})
export class MentorHomeComponent implements OnInit {
  displayedColumns: string[] = [
    'mentorName',
    'mentorExpert',
    'availMentor',
    'action',
  ]; // Columns to display in the table
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Success':
        return 'success status-label';
      case 'Failure':
        return 'failure status-label';
      case 'In Progress':
        return 'in-progress status-label';
      default:
        return 'status-label';
    }
  }
}
