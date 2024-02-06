import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ianswersset } from '../registrationInterface';
import { RegistraionQuestionSetService } from './registraion-question-set.service';
import ls from 'localstorage-slim'
@Component({
  selector: 'app-sign-up-questions',
  templateUrl: './sign-up-questions.component.html',
  styleUrls: ['./sign-up-questions.component.scss']
})
export class SignUpQuestionsComponent implements OnInit {
  display:boolean = false;
  @Input() sidebarEnable:boolean = false
  @Output() quistionSubmit = new EventEmitter();
  isOtpPage:boolean = false;
  questionSets!:FormGroup;
  answersSet:Ianswersset={
    id:'',
    companyName: '',
    companyEstableYear: '',
    aboutCompany: '',
    noEmployee: 0,
    placeOfWork: '',
    salary: ''
  }
  redirectToOtp:boolean = false
  constructor(private cdr:ChangeDetectorRef,private fb:FormBuilder,private pipe:DatePipe,private questionSet:RegistraionQuestionSetService) { }

  ngOnInit(): void {
    this.display = this.sidebarEnable;
    this.questionSets =this.fb.group({
      companyName: ['',[Validators.required]],
      companyEstableYear:['',[Validators.required]],
      aboutCompany:['',[Validators.required]],
      noEmployee:[0,[Validators.required]],
      placeOfWork:['',[Validators.required]],
      salary:['',[Validators.required]]
    })
  }

  onHide(){
    this.display = false
  }

  onSubmitAnswers(){
    // this.cdr.detectChanges();
    // this.quistionSubmit.emit(true);
    // this.isOtpPage = true

    const establishmentYear = this.pipe.transform(this.questionSets?.get('companyEstableYear')?.value,'yyyy')?.toString()
    let id:string | null = ls.get('registerId')
    if(establishmentYear){
    this.answersSet = {
      id:id,
      companyName:this.questionSets?.get('companyName')?.value,
      companyEstableYear:establishmentYear,
      aboutCompany:this.questionSets?.get('aboutCompany')?.value,
      noEmployee:this.questionSets?.get('noEmployee')?.value,
      placeOfWork:this.questionSets?.get('placeOfWork')?.value,
      salary:this.questionSets?.get('salary')?.value,
    }
  }

    this.questionSet.submitIndustraryQuestionAnswers( this.answersSet).subscribe({
      next: (res)=>{
        // this.api
        // this.quistionSubmit.emit(true);
        this.redirectToOtp = true

      },
      error: (err)=>{
      }
    })
    
  }
}
