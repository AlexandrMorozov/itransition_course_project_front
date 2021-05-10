import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
import { Campaign } from 'src/app/domain/campaign';

const API_URL = 'http://localhost:8080/campaign';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'undefined' })
};

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }


  getCampaign(campaignName: string): Observable<any> {
    const params = new HttpParams().set("campaignName", campaignName);
    return this.http.get(API_URL + "/getcampaign", {responseType: "json", params});
  }

  getAvgRating(campaignId: number) {
    const params = new HttpParams().set("campaignId", campaignId.toString());
    return this.http.get(API_URL + "avgrating", {responseType: "json", params});
  }

  addCampaign(form: any, tags, bonuses, selectedTopic, user/*campaign: Campaign*//*, file: FormData*/): Observable<any> {

    return this.http.post("http://localhost:8080/campaign/add", {
        user: user,
        name: form.name,
        description: form.desc,
        videoLink: form.video,
        sumOfMoney: form.sum,
        lastUpdateDate: form.date,
        lastDateOfCampaign: form.date,
        tags: tags,
        bonuses: bonuses,
        topic: selectedTopic,
    });
  }

  updateCampaign(form: any, tags, bonuses, selectedTopic, user, id: number/* campaign: Campaign*/): Observable<any> {
    return this.http.post("http://localhost:8080/campaign/update", {
      id: id,
      user: user,
      name: form.name,
      description: form.desc,
      videoLink: form.video,
      sumOfMoney: form.sum,
      lastUpdateDate: form.date,
      lastDateOfCampaign: form.date,
      tags: tags,
      bonuses: bonuses,
      topic: selectedTopic,
     // image: file
     /* campaign: campaign*/
    });
  }


  deleteCampaign(campaigns: any[]) {

    return this.http.post(API_URL + '/delete', {
      campaigns: campaigns
    });
  }

  getAllThemes(): Observable<any> {
    return this.http.get("http://localhost:8080/getthemes", {responseType: "json"});
  }

  uploadImages(file: FormData/*, id: number*/,name: string) {
    console.log("qqqq");
    file.append("id", /*id.toString()*/name);

    return this.http.post("http://localhost:8080/campaign/addimages",file
    );
  }

}