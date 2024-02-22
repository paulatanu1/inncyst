import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InternshipProfileService } from '../service/internship-profile.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';

@Component({
  selector: 'app-achivment',
  templateUrl: './achivment.component.html',
  styleUrls: ['./achivment.component.scss']
})
export class AchivmentComponent implements OnInit {
achivmentForm!:FormGroup;
formOpen=false
formArrayLength!:number;
achivmentDetails:any;
visible: boolean = false;
achivmentEditForm!:FormGroup;
editAchivmentId:any
  constructor(private fromBuilder:FormBuilder,private datePipe:DatePipe,private internship:InternshipProfileService,private _toast:ToastServiceService) { }

  ngOnInit(): void {
    this.achivmentForm=this.fromBuilder.group({
      title:[''],
      description:[''],
      date:[''],
      held:[''],
    })

    this.achivmentEditForm=this.fromBuilder.group({
      title:[''],
      description:[''],
      date:[''],
      held:[''],
    })
   this.addAchivment();
  }
addNewAchivment(){
  this.formOpen=true
}

dateSelect(e: any) {
  const date = this.datePipe.transform(e,'dd-MM-yyy');
  this.achivmentForm.get('date')?.setValue(date);
}
editDateSelect(e:any){
  const date = this.datePipe.transform(e,'dd-MM-yyy');
  this.achivmentEditForm.get('date')?.setValue(date);
}
removeGroup(){
  this.formOpen=false;
  this.achivmentForm.reset()
}

addAchivment(){
  this.internship.getAchivement().subscribe({
    next:(res)=>{
      this.achivmentDetails=res.data
    }
  })
}
edit(id:any){
this.editAchivmentId=id
this.visible=true;
this.internship.getSingleAchivment(this.editAchivmentId).subscribe({
  next:(res)=>{
    this.achivmentEditForm.get('title')?.setValue(res.data.title);
    this.achivmentEditForm.get('description')?.setValue(res.data.description);
    this.achivmentEditForm.get('held')?.setValue(res.data.held);
    const date = this.datePipe.transform(res.data.date,'dd-MM-yyy');
    this.achivmentEditForm.get('date')?.setValue(date);
  },
  error:(err)=>{
    this.visible=false;
    this._toast.showToaster.next({
      severity: 'error',
      summary: 'error',
      detail: err.error.message,
    });
  }
})

}
submit(){
  // console.log(this.achivmentForm.value)
  if(this.achivmentForm.valid){
    this.internship.addAchivment(this.achivmentForm.value).subscribe({
      next:(res)=>{
        this.addAchivment();
        this.formOpen=false;
        this.achivmentForm.reset();
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
      },
      error:(err)=>{
        this.formOpen=false;
        this.achivmentForm.reset();
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      }
    })
  }
}
editSubmit(){
this.internship.editAchivment(this.achivmentEditForm.value,this.editAchivmentId).subscribe({
  next:(res)=>{
    this.addAchivment();
    this.visible=false

  },
  error:(err)=>{
    this.visible=false
    this._toast.showToaster.next({
      severity: 'error',
      summary: 'error',
      detail: err.error.message,
    });
  }
})
}
delete(id:any){
  this.internship.deleteAchivment(id).subscribe({
    next:(res)=>{
      this.addAchivment();
      this._toast.showToaster.next({
        severity: 'success',
        summary: 'success',
        detail: res.message,
      });
    },
    error:(err)=>{
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail: err.error.message,
      });
    }
  })
}
}
