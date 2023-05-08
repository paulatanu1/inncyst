import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-questions',
  templateUrl: './sign-up-questions.component.html',
  styleUrls: ['./sign-up-questions.component.scss']
})
export class SignUpQuestionsComponent implements OnInit {
  display:boolean = false;
  @Input() sidebarEnable:boolean = false
  @Output() quistionSubmit = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    this.display = this.sidebarEnable
  }

  onHide(){
    this.display = false
  }

  onSubmitAnswer(){
    this.quistionSubmit.emit(true);
    
  }
}
