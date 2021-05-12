import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/domain/role';
import { Roles } from 'src/app/domain/roles';
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

    this.getAllUsers();

  }


  changeUserState(isBlocked: boolean) {

    this.adminService.changeUserState(this.selectedUsers, isBlocked).subscribe(
      data => {

        this.selectedUsers.forEach(function(value) { value.isEnabled = isBlocked });
        this.selectedUsers = null;
        
      }, err => {

      }
    );
  }

  deleteUsers(users: User[]) {
    this.adminService.deleteUsers(users).subscribe(
      data => {
        
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.selectedUsers = null;

      }, err => {
        
      }
    );
  }

  deleteUser(user: User) {

    var users: User[] = [user];

    this.adminService.deleteUsers(users).subscribe(
      data => {
        this.users = this.users.filter(val => (val.id !== user.id));
        this.selectedUser = null;
      }, err => { }
    );
  }

  giveAdmin() {
    
    this.adminService.giveRoles(this.selectedUsers).subscribe(
      data => {

        this.selectedUsers.forEach(function(value) {

          var res = value.roles.find(element => element.roleName == Roles.ROLE_ADMIN);

           if (res == undefined) {
             
            var role = new Role();
            role.roleName = Roles.ROLE_ADMIN;
            
            value.roles.push(role);
            
            } 

          });

          this.selectedUsers = null;

      }, err => {}
    );
  }

  //err
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => { this.users = data;});
  }

}
