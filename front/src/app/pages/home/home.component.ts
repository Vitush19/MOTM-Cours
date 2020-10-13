import { Component, OnInit } from '@angular/core';
import { MOTMS } from '../../models/mock-motms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  motms = MOTMS;
  map = new Map();
  selectedDate = new Date(Date.now());
  constructor() {
    this.motms.forEach(element => this.map.set([element.date.getMonth(),element.date.getFullYear()],element.title))
  }

  ngOnInit(): void {
  }
  onSelectDate(date:number): void {
    this.selectedDate = new Date(date[1],date[0]);
    }


}
