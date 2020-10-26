import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../services/templates.service';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Template } from '../models/template.model';
import { User } from '../models/user.model';
import { MailService } from '../services/mail.service';
import { DatePipe } from '@angular/common';
import { Mail } from '../models/mail.model';

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: ['./mail-template.component.css']
})
export class MailTemplateComponent implements OnInit {

  user: User[]
  template: Template[];
  mail: Mail[];
  submitted = false;
  id;
  sub;
  myDate = new Date();
  notDisplayed = false;

  constructor(
    private templateService: TemplatesService, 
    private userService: UserService, 
    private mailService: MailService, 
    private router: Router, 
    private _Activatedroute:ActivatedRoute,
    private datePipe: DatePipe
    ) { }
    
  ngOnInit(): void {
    this.templateService.getTemplate().subscribe(template => this.template = template)
    this.userService.getUsers().subscribe(user => this.user = user)
    this.mailService.getMail().subscribe(mail => this.mail = mail)
    this.sub=this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    })
  }

  onSubmit(ngForm: NgForm) {
    let dateToday = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
    let temp = defaultsDeep({
      id: null,
      note: ngForm.form.value.note,
      comment: ngForm.form.value.comment,
      date: dateToday,
      mail: this.user[(this.id)].mail
    });
    this.mailService.addMail(temp).subscribe(temp => {
      if(temp  == null){
        this.notDisplayed = true;
      }
      else {
        this.submitted = true;
      }
    });
    
  }
}
