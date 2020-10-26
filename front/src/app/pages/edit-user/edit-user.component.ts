import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { defaultsDeep } from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    user: User[];
    private ids: number;
    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {

    }


    ngOnInit(){
        const id = this.route.snapshot.params.id;
        console.log(id);
        this.ids = id
    }

    onSubmit(ngForm: NgForm) {
      console.log(ngForm);
      if(ngForm.valid) {
          const user = defaultsDeep({
              id: null,
              firstName: ngForm.form.value.firstName,
              lastName: ngForm.form.value.lastName,
              email: ngForm.form.value.email,
              age: ngForm.form.value.age,
          });
          user.id = this.ids;
          this.userService.editUser(user).subscribe(user => console.log(user));
          console.log(user);

          this.router.navigateByUrl('/user');
      }
    }
}
