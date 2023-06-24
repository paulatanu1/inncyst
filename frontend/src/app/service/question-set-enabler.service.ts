import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetEnablerService {
  isQuestionSetEnable = new Subject<boolean>()
  constructor() { }
}
