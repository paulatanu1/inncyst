import { Component, OnInit } from '@angular/core';
interface cities {
    optionName: string,
    code: string
}
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  cities: cities[];
  constructor() { 
    this.cities = [
        {optionName: 'New York', code: 'NY'},
        {optionName: 'Rome', code: 'RM'},
        {optionName: 'London', code: 'LDN'},
        {optionName: 'Istanbul', code: 'IST'},
        {optionName: 'Paris', code: 'PRS'}
        ];
  }

  ngOnInit(): void {
  }

}
