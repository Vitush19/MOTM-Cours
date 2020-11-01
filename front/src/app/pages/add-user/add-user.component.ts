import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { defaultsDeep } from 'lodash';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() title;

  constructor(private userService: UserService, private router: Router, public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid) {
      const user = defaultsDeep({
        id: null,
        firstName: ngForm.form.value.firstName,
        lastName: ngForm.form.value.lastName,
        age: ngForm.form.value.age,
        mail: ngForm.form.value.mail,
      });
      this.userService.addUser(user).subscribe(user => console.log(user));
      const currentRoute =this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]);
      });
      this.activeModal.close('success');
    }
  }
}
