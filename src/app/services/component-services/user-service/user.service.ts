import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../domain/user';
import { GlobalConstants } from '../../../common/global-constants';

const API_URL = GlobalConstants.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserAccount(userName: string): Observable<any> {
    const params = new HttpParams().set("name", userName);

    return this.http.get(API_URL + "/user/", {responseType: "json", params});
  }

  getUserEssentials(userName: string): Observable<User> {

    const params = new HttpParams().set("name", userName);

    return this.http.get<User>(API_URL + "/user/essentials", {responseType: "json", params});
  }

  changeUserName(newUserName: string): Observable<any> {
    const params = new HttpParams().set("name", newUserName);

    return this.http.get(API_URL + "/user/changename", {responseType: "json", params});
  }

  changeUserMail(oldUserMail: string, newUserMail: string): Observable<any> {
    const params = new HttpParams()
    .set("oldEmail", oldUserMail)
    .set("newEmail", newUserMail);

    return this.http.get(API_URL + "/user/changemail", {responseType: "json", params});
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + "/user/getallusers", {responseType: 'json'});
  }

}
