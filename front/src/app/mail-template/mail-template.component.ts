import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../services/templates.service';
import { NgForm } from '@angular/forms';
import { defaultsDeep } from 'lodash';
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
  mailEdit: Mail;
  submitted = false;
  id;
  sub;
  myDate = new Date();
  notDisplayed = false;

  constructor(
    private templateService: TemplatesService,
    private userService: UserService,
    private mailService: MailService,
    private _Activatedroute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.templateService.getTemplate().subscribe(template => this.template = template)
    this.userService.getUsers().subscribe(user => this.user = user)
    this.mailService.getMail().subscribe(mail => this.mail = mail)
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.mailService.getMailbyUser(this.id).subscribe(m => this.mailEdit = m);
    })
  }

  onSubmit(ngForm: NgForm) {
    let dateToday = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
    let mailToSend = defaultsDeep({
      id: null,
      note: ngForm.form.value.note,
      comment: ngForm.form.value.comment,
      date: dateToday,
      mail: this.user[(this.id) - 1].mail
    });
    this.mailService.addMail(mailToSend).subscribe(mail => {
      if (mail == null) {
        this.notDisplayed = true;
      }
      else {
        this.submitted = true;
      }
    });
  }

  onEdit(ngForm: NgForm) {
    const dateToday = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
    const mailToUpdate = defaultsDeep({
      id: this.mailEdit.id,
      note: ngForm.form.value.noteEdit,
      comment: ngForm.form.value.commentEdit,
      date: dateToday,
      mail: this.user[(this.id) - 1].mail
    });
    this.mailService.updateMail(mailToUpdate).subscribe(mail => {
      if (mail == null) {
        this.notDisplayed = true;
      }
      else {
        this.submitted = true;
      }
    });
  }
}
