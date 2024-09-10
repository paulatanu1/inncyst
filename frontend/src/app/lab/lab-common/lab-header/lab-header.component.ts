import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-lab-header',
  templateUrl: './lab-header.component.html',
  styleUrls: ['./lab-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabHeaderComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = 'Enea';

  constructor() {}

  ngOnInit(): void {}
  logout(): void {
    console.log('Logged out');
  }
}
