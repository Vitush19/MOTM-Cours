import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail.model';
import { DatePipe } from '@angular/common';
import { MailService } from 'src/app/services/mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-motm',
  templateUrl: './motm.component.html',
  styleUrls: ['./motm.component.css']
})
export class MotmComponent implements OnInit {

  mails: Mail[];
  data = [];
  formData;

  settings = {
    selectMode: 'single',
    hideHeader: false,
    hideSubHeader: false,
    mode: 'external',
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: 'right'
    },
    noDataMessage: 'No data found',
    columns: {
      note: {
        title: 'Note',
        type: 'int',
        filter: true,
        editable: true
      },
      comment: {
        title: 'Commentaire',
        type: 'string',
        filter: true,
        editable: true
      },
      date: {
        title: 'Date d\'envoi',
        type: 'date',
        filter: true,
        editable: true,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'yyyy MMM dd');
          return formatted;
        }
      },
      mail: {
        title: 'E-mail',
        type: 'string',
        filter: true,
        editable: true
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(private mailService: MailService, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.mailService.getMail().subscribe(mails => this.data = mails);
  }

}
