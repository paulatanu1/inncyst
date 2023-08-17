import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LeftMenuHandelService {
  leftMenuActive = new Subject<number>()
  constructor() { }
}
