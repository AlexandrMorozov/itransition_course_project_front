import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../common/global-constants';
import { Bonus } from 'src/app/domain/bonus';
import { Campaign } from 'src/app/domain/campaign';

const API_URL = GlobalConstants.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CampaignViewService {

  constructor(private http: HttpClient) { }

  donateSum(sumOfMoney: number, campaignId: number): Observable<any> {

    const params: HttpParams = new HttpParams()
    .set("sumOfMoney", sumOfMoney.toString())
    .set("campaignId", campaignId.toString());

    return this.http.get(API_URL + "/campaign/donatemoney", {responseType: 'json', params: params});
  }

  purchaseBonus(userId: number, bonus: Bonus, campaign: Campaign): Observable<any> {
    return this.http.post(API_URL + "/user/purchasebonus", {userId: userId, bonus: bonus, campaign: campaign});
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

  rateCampaign(userId: number, campaignName: string, ratingValue: number) {

    const params: HttpParams = new HttpParams()
    .set("userId", userId.toString())
    .set("campaignName", campaignName)
    .set("ratingValue", ratingValue.toString());

    return this.http.get(API_URL + "/user/addrating", {params: params} );

  }

  

}
