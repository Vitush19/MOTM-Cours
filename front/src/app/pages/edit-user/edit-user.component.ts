import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { defaultsDeep } from 'lodash';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() formData;


  user: User[];
  private ids: number;
  constructor(private userService: UserService, private router: Router,
    public activeModal: NgbActiveModal) { }


  ngOnInit() {
    const id = this.formData.id;
    this.ids = id;
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid) {
      const user = defaultsDeep({
        id: null,
        firstName: ngForm.form.value.firstName,
        lastName: ngForm.form.value.lastName,
        age: ngForm.form.value.age,
        mail: ngForm.form.value.mail,
      });
      user.id = this.ids;
      this.userService.editUser(user).subscribe(u => console.log(u));
      const currentRoute =this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]);
      });
      this.activeModal.close('success');
    }
  }
}