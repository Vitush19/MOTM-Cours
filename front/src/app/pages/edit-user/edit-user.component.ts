import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { defaultsDeep } from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import { MailService } from 'src/app/services/mail.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    user: User[];
    mails: number[];
    private ids: number;
    constructor(private userService: UserService, private mailService: MailService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(){
        const id = this.route.snapshot.params.id;
        console.log(id);
        this.ids = id
        this.mailService.getMailsOfUser(this.ids).subscribe(e => this.mails = e)
    }

    onSubmit(ngForm: NgForm) {
      console.log(ngForm);
      if(ngForm.valid) {
          const user = defaultsDeep({
              id: this.ids,
              firstName: ngForm.form.value.firstName,
              lastName: ngForm.form.value.lastName,
              age: ngForm.form.value.age,
              mail: ngForm.form.value.mail,
              mailList: []
          });
          this.userService.editUser(user).subscribe(user => console.log(user));
          console.log(user);

          this.router.navigateByUrl('/user');
      }
    }
}