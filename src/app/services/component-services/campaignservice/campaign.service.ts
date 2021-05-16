import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/domain/campaign';
import { Topic } from 'src/app/domain/topic';
import { GlobalConstants } from '../../../common/global-constants';

const API_URL = GlobalConstants.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getCampaign(campaignName: string): Observable<Campaign> {

    const params = new HttpParams().set("campaignName", campaignName);

    return this.http.get<Campaign>(API_URL + "/campaign/getcampaign", {responseType: "json", params});
  }

  //
  getAvgRating(campaignId: number) {

    const params = new HttpParams().set("campaignId", campaignId.toString());

    return this.http.get(API_URL + "avgrating", {responseType: "json", params});
  }

  addCampaign(file: FormData): Observable<any> {
    return this.http.post(API_URL + "/campaign/add", file);
  }

  updateCampaign(file: FormData): Observable<any> {
    return this.http.post(API_URL + "/campaign/update", file);
  }

  deleteCampaign(campaigns: Campaign[]) {

    return this.http.post(API_URL + '/campaign/delete', campaigns);
  }

  getAllThemes(): Observable<Topic[]> {

    return this.http.get<Topic[]>(API_URL + "/getthemes", {responseType: "json"});
  }
}