import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../common/global-constants';

const API_URL = GlobalConstants.apiURL;
const httpOptions = GlobalConstants.httpOptions;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(API_URL + "/auth/authentication", {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


  register(user): Observable<any> {
    return this.http.post(API_URL + '/auth/registration', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

}
