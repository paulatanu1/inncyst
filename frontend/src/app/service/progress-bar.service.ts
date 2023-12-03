import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  isProgressBarShow = new Subject<boolean>();
  constructor() { }


}
