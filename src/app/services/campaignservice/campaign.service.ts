import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/campaign';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getCampaign(campaignName: string): Observable<any> {
    const params = new HttpParams().set("campaignName", campaignName);

    return this.http.get(API_URL + "/main", {responseType: "json", params});
  }

  getAvgRating(campaignId: number) {
    const params = new HttpParams().set("campaignId", campaignId.toString());

    return this.http.get(API_URL + "avgrating", {responseType: "json", params});
  }

  addCampaign() {

  }



  deleteCampaign(/*ids: number[]*/campaigns: any[]) {

    console.log(campaigns);

    /*console.log(JSON.stringify(ids));

    const params = new HttpParams().set("campaigns", JSON.stringify(ids));
    return this.http.get(API_URL + "/delete", {params});*/

    return this.http.post(API_URL + '/delete', {
      campaigns: /*ids*/campaigns
    });
  }




}