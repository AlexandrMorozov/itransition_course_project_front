import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../common/global-constants';
import { Bonus } from 'src/app/domain/bonus';

const API_URL = GlobalConstants.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CampaignViewService {

  constructor(private http: HttpClient) { }

 /* getCampaignData(campaignName: string): Observable<any> {

    const params: HttpParams = new HttpParams().set("campaignName", campaignName);
    return this.http.get(API_URL + "/getcampaign", {responseType: "json", params: params});
  }*/

  donateSum(sumOfMoney: number, campaignId: number): Observable<any> {

    const params: HttpParams = new HttpParams()
    .set("sumOfMoney", sumOfMoney.toString())
    .set("campaignId", campaignId.toString());

    return this.http.get(API_URL + "/campaign/donatemoney", {responseType: 'json', params: params});
  }

  purchaseBonus(bonus: Bonus): Observable<any> {
    return this.http.post(API_URL + "/buybonus", bonus);
  }

  getAvgCampaignRating(campaignId: number): Observable<number> {
    const params: HttpParams = new HttpParams().set("campaignId", campaignId.toString());

    return this.http.get<number>(API_URL + "/rating/average", {params: params});
  }

  getUserCampaignRating(campaignId: number, userId: number): Observable<number> {

    const params: HttpParams = new HttpParams()
    .set("campaignId", campaignId.toString())
    .set("userId", userId.toString());

    return this.http.get<number>(API_URL + "/rating/user", {params: params});

  }

}
