interface FacilityFormData {
  facilityName: string;
  category: string;
  description: string;
  modelNumber: string;
  make: string;
  yearOfManufacture: number;
  technicalSpecifications: string;
  userManual: File; // or string if you're using a URL
  guidelines: string;
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabLoginRegService } from 'src/app/lab-services/lab-login-reg.service';

@Component({
  selector: 'app-facilites-add',
  templateUrl: './facilites-add.component.html',
  styleUrls: ['./facilites-add.component.scss'],
})
export class FacilitesAddComponent implements OnInit {
  equipmentForm!: FormGroup;
  manualFile: File | null = null;
  constructor(private fb: FormBuilder, private labService: LabLoginRegService) {
    this.equipmentForm = this.fb.group({
      facilityName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      modelNumber: [''],
      make: ['', Validators.required],
      year: [''],
      technicalSpecs: ['', Validators.required],
      manual: [null],
      guidelines: [''],
    });
  }

  ngOnInit(): void {}

  // Handling file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.manualFile = file; // Store the file in a variable
    }
  }

  onSubmit() {
    if (this.equipmentForm.valid) {
      const formData = new FormData();

      // Append form fields to the FormData object
      formData.append(
        'facilityName',
        this.equipmentForm.get('facilityName')?.value
      );
      formData.append('category', this.equipmentForm.get('category')?.value);
      formData.append(
        'description',
        this.equipmentForm.get('description')?.value
      );
      formData.append(
        'modelNumber',
        this.equipmentForm.get('modelNumber')?.value
      );
      formData.append('make', this.equipmentForm.get('make')?.value);
      formData.append('year', this.equipmentForm.get('year')?.value);
      formData.append(
        'technicalSpecs',
        this.equipmentForm.get('technicalSpecs')?.value
      );
      formData.append(
        'guidelines',
        this.equipmentForm.get('guidelines')?.value
      );

      // Append the file if it exists
      if (this.manualFile) {
        formData.append('manual', this.manualFile, this.manualFile.name);
      }

      // Send form data to the server (replace 'your-api-endpoint' with your actual API URL)
      this.labService.createFacility(formData).subscribe({
        next: (res) => {
          console.log(res, 'form submit');
        },
      });
    } else {
      console.log('Form is not valid!');
    }
  }

  onReset() {
    this.equipmentForm.reset();
    this.manualFile = null; // Reset the file input as well
  }

  onExit() {
    // Handle exit logic here
  }
}
