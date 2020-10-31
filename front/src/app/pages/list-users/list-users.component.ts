import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[];
  data = [];

    settings = {
        selectMode: 'single',
        hideHeader: false,
        hideSubHeader: false,
        mode:'external',
        actions: {
            columnTitle: 'Actions',
            add: false,
            edit: true,
            delete: true,
            custom: [],
            position: 'right'
        },

        edit: {
            editButtonContent: '<i class="fa fa-pencil mr-3 text-primary"></i>',
            saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
            cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
        },
        delete: {
            deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
            confirmDelete: true
        },
        noDataMessage: 'No data found',
        columns: {

            firstName: {
                title: 'First name',
                type: 'string',
                filter: true,
                editable: true
            },
            lastName: {
                title: 'Last name',
                type: 'string',
                filter: true,
                editable: true
            },
            age: {
                title: 'Date of birth',
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



  constructor(private userService: UserService, private router: Router,private datePipe: DatePipe) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.data = users);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(succes => {
      this.users = this.users.filter(user => user.id !== id)
    });
  }
}
