import {Component, Input, OnInit} from '@angular/core';
import { MOTMS } from '../../../models/mock-motms';

@Component({
  selector: 'app-month-details',
  templateUrl: './month-details.component.html',
  styleUrls: ['./month-details.component.css']
})
export class MonthDetailsComponent implements OnInit {
  motms=MOTMS;
  @Input() selectedDate;
  constructor() {
  }

  ngOnInit(): void {
  }

}
