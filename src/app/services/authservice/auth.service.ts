import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
/*import { LoginComponent } from '../login/login.component';
import { registerLocaleData } from '@angular/common';*/

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + "authentication", {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'registration', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

}
