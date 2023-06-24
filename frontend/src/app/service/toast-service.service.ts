import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  showToaster = new Subject<{severity:string;summary:string;detail:string}>();
  constructor() { }
}
