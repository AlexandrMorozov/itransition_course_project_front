import { Component, OnInit } from '@angular/core';
import { SelectableRowDblClick } from 'primeng/table';
import { find } from 'rxjs/operators';
import { Role } from 'src/app/domain/role';
import { Roles } from 'src/app/domain/roles';
import { TokenStorageService } from 'src/app/services/authorization/tokenstorageservice/token-storage.service';
import { AdminService } from 'src/app/services/component-services/admin-service/admin.service';
import { User } from '../../domain/user';
import { UserService } from '../../services/component-services/user-service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(private userService: UserService, 
    private adminService: AdminService,
     private tokenService: TokenStorageService) { }

  users: User[] = new Array();

  selectedUsers: User[] = new Array();

  selectedUser: User;

  ngOnInit(): void {
    this.getAllUsers();
  }


  changeUserState(isEnabled: boolean) {

    console.log(isEnabled);
    this.adminService.changeUserState(this.selectedUsers, isEnabled).subscribe(
      data => {
        //
        this.selectedUsers = null;
        window.location.reload()
        
      }, err => {this.tokenService.signOut();}
    );
  }

  deleteUsers() {

    this.adminService.deleteUsers(this.selectedUsers).subscribe(
      data => {
        
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.selectedUsers = null;

      }, err => {this.tokenService.signOut();}
    );
  }

  deleteUser(user: User) {

    var users: User[] = [user];

    this.adminService.deleteUsers(users).subscribe(
      data => {
        this.users = this.users.filter(val => (val.id !== user.id));
        this.selectedUser = null;
      }, err => {this.tokenService.signOut();}
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

      }, err => {this.tokenService.signOut();}
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {this.users = data;},
       err => {this.tokenService.signOut();});
  }

}
