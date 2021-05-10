import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../common/global-constants';

const API_URL = GlobalConstants.apiURL;
const httpOptions = GlobalConstants.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }
  getAllTags(): Observable<any> {
    return this.http.get(API_URL + "/tags/gettags", {responseType: "json"});
  }

}
