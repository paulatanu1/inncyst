import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-agree-dialog',
  templateUrl: './registration-agree-dialog.component.html',
  styleUrls: ['./registration-agree-dialog.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationAgreeDialogComponent {
openDialog() {
throw new Error('Method not implemented.');
}
  constructor(
    public dialogRef: MatDialogRef<RegistrationAgreeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { checked: boolean }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.data.checked);
  }
}