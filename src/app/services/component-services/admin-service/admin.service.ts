import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../common/global-constants';
import { User } from '../../../domain/user';
import { Roles } from 'src/app/domain/roles';

const API_URL = GlobalConstants.apiURL;
const httpOptions = GlobalConstants.httpOptions;//

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  deleteUsers(users: User[]) {
    console.log(users);
   return this.http.post(API_URL + "/user/delete", users);
  }

  changeUserState(users: User[], isEnabled: boolean) {
    console.log(isEnabled);
    return this.http.post(API_URL + "/user/changestatus", {users: users, newStatus: isEnabled});
  }

  giveRoles(users: User[]) {
    console.log(users);
    console.log(Roles.ROLE_ADMIN.toString());
    return this.http.post(API_URL + "/user/addrole",{users: users, roleName: Roles.ROLE_ADMIN.toString()});
  }

}
