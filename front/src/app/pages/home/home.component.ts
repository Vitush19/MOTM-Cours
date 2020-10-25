import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail.model';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
  selectedMonth: number;
  mail:Mail[];
  monthMail: any[] = [];
  comments: string[] = [];
  notes: number[] = [];
  currentMonth: string;
  result: number;

  constructor(private mailService: MailService, private datepipe: DatePipe) {
    this.mailService.getMail().subscribe(mail => {
      this.mail = mail; 
      this.mail.forEach(element => { 
        let stock = this.datepipe.transform(element.date, "yyyy-MM-dd").split("-", 2);
        this.monthMail.push(stock[1]);
      })
      
      })
  }

  ngOnInit(): void {
    
  }
  
  onSelect(month: string, id: number): void {
    this.currentMonth = month;
    this.selectedMonth = id+1;
    this.mail.forEach(e => {
      let stock = this.datepipe.transform(e.date, "yyyy-MM-dd").split("-", 2);
      let check = stock[1];
      if(+check === this.selectedMonth){
        this.comments.push(e.comment);
        this.notes.push(e.note);
      }
    })
    if (typeof this.notes !== 'undefined' && this.notes.length > 0) {
      const average = arr => arr.reduce((p,c) => p+c, 0)/arr.length;
      this.result = average(this.notes);
      //console.log(this.result);
    } 
    this.result = undefined;
    this.comments = [];
    this.notes = [];
  }

}
