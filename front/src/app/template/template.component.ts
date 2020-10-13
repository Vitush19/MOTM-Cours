import { Component, OnInit } from '@angular/core';
import { Mail } from '../mail';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  //codé en dur mais à revoir avec le back
  mail: Mail = {
    msgNote: "Donnez votre note du mois :",
    note: 5,
    titre: "Comment allez-vous ?",
    commentaire: "Ca se passe."
  }

  constructor() { }

  ngOnInit(): void {
  }

}
