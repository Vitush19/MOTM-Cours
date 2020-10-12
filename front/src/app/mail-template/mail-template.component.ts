import { Component, OnInit } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { Mail } from '../mail';

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail.template.component.html',
  styleUrls: ['./mail.template.component.css']
})
export class MailTemplateComponent implements OnInit {

  mail: Mail = {
    note: 5,
    titre: "Comment allez-vous ?",
    commentaire: "Ca se passe."
  }
  constructor() { }

  ngOnInit(): void {
  }

}
