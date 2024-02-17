import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-achivment',
  templateUrl: './achivment.component.html',
  styleUrls: ['./achivment.component.scss']
})
export class AchivmentComponent implements OnInit {
achivmentForm!:FormGroup;
formOpen=false
formArrayLength!:number
  constructor(private fromBuilder:FormBuilder,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.achivmentForm=this.fromBuilder.group({
      title:[''],
      description:[''],
      date:[''],
      held:[''],
    })
  }
addNewAchivment(){
  this.formOpen=true
}

dateSelect(e: any) {
  const date = this.datePipe.transform(e,'dd-MM-yyy');
  this.achivmentForm.get('date')?.setValue(date);
}
removeGroup(){
  this.formOpen=false;
  this.achivmentForm.reset()
}
submit(){
  console.log(this.achivmentForm.value)
}
}
