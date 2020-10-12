import { Component, OnInit } from '@angular/core';
import {Motm} from '../../models/motm.model';
import { MOTMS } from '../../models/mock-motms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  motms = MOTMS;
  constructor() { }

  ngOnInit(): void {
  }

}
