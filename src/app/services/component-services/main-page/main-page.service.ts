import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../common/global-constants';

const API_URL = GlobalConstants.apiURL;
const httpOptions = GlobalConstants.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(private http: HttpClient) { }


  loadMostRatedCampaigns(): Observable<any> {
    return this.http.get(API_URL + "/campaign/getrated", httpOptions);
  }

  loadLastUpdatedCampaigns(): Observable<any> {
    return this.http.get(API_URL + "/campaign/getupdated", httpOptions);
  }

}
