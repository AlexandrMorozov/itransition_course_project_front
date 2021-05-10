import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../common/global-constants';
import { User } from '../../domain/user';

const API_URL = GlobalConstants.apiURL;
const httpOptions = GlobalConstants.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  deleteUsers(users: User[]) {
   /* const params = new HttpParams().set("userId", userId.toString());*/

   // return this.http.get(API_URL + "/admin/delete", {responseType: "json", params: params});
   return this.http.post(API_URL + "/user/delete",{users: users});
  }

  blockUsers(/*userId: number, isBlocked: boolean*/users: User[], isBlocked: boolean) {

   /* const params = new HttpParams()
    .set("userId", userId.toString())
    .set("status", isBlocked.toString());*/

    //return this.http.get(API_URL + "/user/changestatus", {responseType: "json", params: params });

    return this.http.post(API_URL + "/user/changestatus", {users: users, isBlocked: isBlocked});
  }

  giveRoles(/*userId: number*/users: User[]) {
    /*const params = new HttpParams()
    .set("userId", userId.toString())
    .set("roleName", "ROLE_ADMIN");*/

    //return this.http.get(API_URL + "/user/addrole", {responseType: "json", params: params});
    return this.http.post(API_URL + "/user/addrole",{users: users, roleName: "ROLE_ADMIN"});
  }

}
