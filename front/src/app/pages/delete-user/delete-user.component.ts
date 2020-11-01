import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {


  @Input() formData;
  id=0;
  
  constructor(private userService: UserService,router: Router, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public onDelete():void{
    this.id = Number(this.formData.id);
    this.userService.deleteUser(this.id).subscribe(succes => {
      this.activeModal.close('success');
    });    
    
  }

}
