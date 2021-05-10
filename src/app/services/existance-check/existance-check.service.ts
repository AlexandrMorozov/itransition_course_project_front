import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../common/global-constants';

const API_URL = GlobalConstants.apiURL;
const httpOptions = GlobalConstants.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class ExistanceCheckService {

  constructor(private http: HttpClient) { }

  isUserExists(userName): Observable<any> {

    const params = new HttpParams().set("username", userName);

    return this.http.get(API_URL + "/user/isexists", { params: params});
  }

  isCampaignExisits(campaignName): Observable<any> {

    const params = new HttpParams().set("campaignname", campaignName);

    return this.http.get(API_URL + "/campaign/isexists", { params: params});
  }
}
