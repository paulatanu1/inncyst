import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogAddExperienceComponent } from './add-experience-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorApiService } from '../mentor-services/mentor-api.service';

interface MentorAboutPayload {
  name: string;
  heading: string;
  workRole: string;
  about: string;
  location: string;
  state: string;
  language: string;
}
@Component({
  selector: 'mentor-add-profile',
  templateUrl: 'mentor-add-profile.html',
  styleUrls: ['./mentor-add-profile.scss'],
})
export class DialogMentorProfile {
  //from section
  mentorForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogMentorProfile>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private mentorService: MentorApiService
  ) {}

  openExperienceDialog() {
    const experienceDialogRef = this.dialog.open(DialogAddExperienceComponent);

    experienceDialogRef.afterClosed().subscribe((result) => {
      console.log(`Experience dialog result: ${result}`);
      // You can use the result if needed or perform further actions
    });
  }

  ngOnInit(): void {
    this.mentorForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      profileHeading: ['', Validators.required],
      whatDoYouDo: ['', Validators.required],
      about: ['', [Validators.required, Validators.minLength(20)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      languages: ['', Validators.required],
    });
  }

  // about mentor from submission

  onSubmit() {
    if (this.mentorForm.valid) {
      console.log('Form Data:', this.mentorForm.value);
      const formData = this.mentorForm.value;
      const payload: MentorAboutPayload = {
        name: formData.fullname,
        heading: formData.profileHeading,
        workRole: formData.whatDoYouDo,
        about: formData.about,
        location: formData.country,
        state: formData.state,
        language: formData.languages,
      };
      this.mentorService.saveMentorAbout(payload).subscribe({
        next: (res) => {
          console.log(res, 'response');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
