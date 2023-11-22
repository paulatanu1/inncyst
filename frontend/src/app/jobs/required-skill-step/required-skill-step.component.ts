import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-required-skill-step',
  templateUrl: './required-skill-step.component.html',
  styleUrls: ['./required-skill-step.component.scss']
})
export class RequiredSkillStepComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
   nextPage() {
    this.router.navigate(['jobs/internships/uploadresume']);
  }
}
