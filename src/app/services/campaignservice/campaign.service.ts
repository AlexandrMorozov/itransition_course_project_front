import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/domain/campaign';
import { Topic } from 'src/app/domain/topic';

const API_URL = 'http://localhost:8080/campaign';

//
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'undefined' })
};

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getCampaign(campaignName: string): Observable<Campaign> {
    const params = new HttpParams().set("campaignName", campaignName);

    return this.http.get<Campaign>(API_URL + "/getcampaign", {responseType: "json", params});
  }

  getAvgRating(campaignId: number) {
    const params = new HttpParams().set("campaignId", campaignId.toString());
    return this.http.get(API_URL + "avgrating", {responseType: "json", params});
  }

  addCampaign(campaign: Campaign, file: FormData): Observable<any> {
    file.append("campaign", JSON.stringify(campaign));

    return this.http.post("http://localhost:8080/campaign/add", file);
  }

  updateCampaign(campaign: Campaign,file: FormData): Observable<any> {

    file.append("campaign", JSON.stringify(campaign));

    return this.http.post("http://localhost:8080/campaign/update", file);
  }


  deleteCampaign(campaigns: Campaign[]) {

    return this.http.post(API_URL + '/delete', /*{
      campaigns: campaigns
    }*/ campaigns);
  }

  getAllThemes(): Observable<Topic[]> {
    return this.http.get<Topic[]>("http://localhost:8080/getthemes", {responseType: "json"});
  }
}