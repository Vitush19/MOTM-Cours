import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Template } from '../../models/template.model';
import { TemplatesService } from '../../services/templates.service';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  template: Template[];
  submitted = false;

  constructor(private templateService: TemplatesService, private router: Router) { }

  ngOnInit(): void {
    this.templateService.getTemplate().subscribe(template => this.template = template)
  }

  onSubmit(ngForm: NgForm) {
      let temp = defaultsDeep({
        id: 1,
        msgNote: ngForm.form.value.msgNote,
        title: ngForm.form.value.title
      });
  
      this.templateService.updateTemplate(temp)
        .subscribe();
        
      this.submitted = true;
  }
  
}
