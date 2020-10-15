import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Template } from '../../models/template.model';
import { TemplatesService } from '../../services/templates.service';
import { Location } from '@angular/common';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  //codé en dur mais à revoir avec le back
  // mail: Mail = {
  //   msgNote: "Donnez votre note du mois :",
  //   note: 5,
  //   titre: "Comment allez-vous ?",
  //   commentaire: "Ca se passe."
  // }
  template: Template[];

  constructor(private templateService: TemplatesService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.templateService.getTemplate().subscribe(template => this.template = template)
  }

  // goBack(): void {
  //   this.location.back();
  // }

  // save(temp): void {
    
  // }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    const temp = defaultsDeep({
      id: 1,
      msgNote: ngForm.form.value.msgNote,
      title: ngForm.form.value.title
    });

    this.templateService.updateTemplate(temp)
      .subscribe();

      this.router.navigateByUrl('/templates');
  }
  
}
