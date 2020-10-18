import { Component, OnInit } from '@angular/core';
import { Mail } from '../mail';
import { Template } from '../models/template.model';
import { TemplatesService } from '../services/templates.service';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: ['./mail-template.component.css']
})
export class MailTemplateComponent implements OnInit {

  template: Template[];

  constructor(private templateService: TemplatesService, private router: Router) { }

  ngOnInit(): void {
    this.templateService.getTemplate().subscribe(template => this.template = template)
    /*
      retrieve user info to bind to the mail
    */ 
  }

  onSubmit(ngForm: NgForm) {
    if(ngForm.valid) {
      let temp = defaultsDeep({
        id: 1,
        note: ngForm.form.value.note,
        comment: ngForm.form.value.comment
      });
      
      //create a addMailResult function to retrieve the data from the user

      // this.templateService.updateTemplate(temp)
      //   .subscribe();
  
      this.router.navigateByUrl('/templates');
    }
  }
}
