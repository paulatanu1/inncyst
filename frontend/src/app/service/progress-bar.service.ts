import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  isProgressBarShow = new Subject<boolean>();
  constructor() { }

setProgressBar(value:boolean){
  this.isProgressBarShow.next(value);
}

getProgressBar(){
  return this.isProgressBarShow.asObservable();
}

}
