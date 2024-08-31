import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateWiseCityService {
  constructor(private http: HttpClient) {}

  getCityList(): Observable<any> {
    return this.http.get('/assets/city-list.json');
  }
}
