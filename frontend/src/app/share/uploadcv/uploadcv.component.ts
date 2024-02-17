import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast } from 'primeng/toast';
import { ApiService } from 'src/app/common-service/api.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { InternshipProfileService } from '../service/internship-profile.service';

@Component({
  selector: 'app-uploadcv',
  templateUrl: './uploadcv.component.html',
  styleUrls: ['./uploadcv.component.scss'],
})
export class UploadcvComponent implements OnInit {
  constructor(
    private _toast: ToastServiceService,
    private api: ApiService,
    private internship: InternshipProfileService
  ) {}
  pdfMaxSize: number = 26214400;
  pdfObj: any;
  resume: any;
  cvObject:any
  existingCv: any;
  editedCv: boolean = false;
  updateCv=false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.internship.getCv().subscribe({
      next: (res) => {
        this.cvObject=res.data[0]
        this.existingCv = res.data[0].resume;
      },
    });
  }
  pdfSelected(e: any) {
    const selectedFile = e.target.files[0];
    if (selectedFile.size <= this.pdfMaxSize) {
      this.pdfObj = selectedFile;
    } else {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail:
          'Upload failed: File size too big. You can upload files within 25 MB',
      });

      // Reset the file input to clear the selected file
      this.fileInput.nativeElement.value = '';
    }
  }
  updateCV(){
    this.existingCv = '';
    this.updateCv=true
  }
  pdfSubmit() {
    // const file = e.target.files[0];


    if(this.updateCv == false){
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.resume = base64String;
        this.internship.uploadResume(this.resume).subscribe({
          next: (res) => {
            this.updateCv=false
          },
        });
      };
      if (this.pdfObj) {
        reader.readAsDataURL(this.pdfObj);
      }
    }
  if(this.updateCv == true){
    const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.resume = base64String;
        console.log(this.resume);
        this.internship.editResume(this.resume,this.cvObject._id).subscribe({
          next: (res) => {
            this.existingCv=res.body.data.resume
            console.log(res.body.data.resume);
            this.updateCv=false
          },
        });
      };
      if (this.pdfObj) {
        reader.readAsDataURL(this.pdfObj);
      }
  }
  }

 
}
