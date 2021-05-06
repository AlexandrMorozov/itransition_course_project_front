import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  //Refactor
  getUserAccount(userName: string): Observable<any> {
    const params = new HttpParams().set("name", userName);

    return this.http.get(API_URL + "user/", {responseType: "json", params});
  }

  changeUserName(newUserName: string): Observable<any> {
    const params = new HttpParams().set("name", newUserName);

    return this.http.get(API_URL + "user/changename", {responseType: "json", params});
  }

  changeUserMail(oldUserMail: string, newUserMail: string): Observable<any> {
    const params = new HttpParams()
    .set("oldEmail", oldUserMail)
    .set("newEmail", newUserMail);

    return this.http.get(API_URL + "user/changemail", {responseType: "json", params});
  }

}
