import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { User } from '../../domain/user';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(private userService: UserserviceService,
     private adminService: AdminService) { }

  users: User[] = new Array();

  selectedUsers: User[] = new Array();

  selectedUser: User;

  ngOnInit(): void {

  }


  changeUserState(/*userId: number,*/ isBlocked: boolean) {

    this.adminService.blockUsers(/*userId, isBlocked*/this.selectedUsers, isBlocked).subscribe(
      data => {
        
      }, err => {

      }
    );
  }

  deleteUsers(/*userId: number*/users: User[]) {
    this.adminService.deleteUsers(users).subscribe(
      data => {

        this.users = this.users.filter(val => val !== this.selectedUser)
        this.users = [];

      }, err => {
        
      }
    );
  }


  giveAdmin() {
    this.adminService.giveRoles(this.selectedUsers).subscribe(
      data => {

      }, err => {
        
      }
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
      );
  }

}
