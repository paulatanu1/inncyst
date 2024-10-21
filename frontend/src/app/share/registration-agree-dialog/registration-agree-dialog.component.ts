import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-agree-dialog',
  templateUrl: './registration-agree-dialog.component.html',
  styleUrls: ['./registration-agree-dialog.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationAgreeDialogComponent implements OnInit {
  isConditionChecked = false;
  disabledCheckbox = false;
  constructor(
    public dialogRef: MatDialogRef<RegistrationAgreeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { checked: boolean }
  ) {}

  ngOnInit(): void {
    console.log(this.dialogRef.componentInstance.data.checked);
    if (this.dialogRef.componentInstance.data.checked) {
      this.isConditionChecked = true;
      this.disabledCheckbox = true;
    }
  }

  onConfirm(): void {
    this.dialogRef.close(this.isConditionChecked);
  }
  discard() {
    this.dialogRef.close();
  }
}
