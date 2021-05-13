import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Bonus } from 'src/app/domain/bonus';
import { GlobalConstants } from '../../../common/global-constants';

const API_URL = GlobalConstants.apiURL;

const httpOptions = GlobalConstants.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class BonusServiceService {

  constructor(private http: HttpClient) { }

  addBonus(bonus: Bonus) {

    const params = new HttpParams().set("bonus", JSON.stringify(bonus));
    return this.http.get(API_URL + "/bonuses/add", {params});
    
  }

  deleteBonus() {

  }

  deleteBonuses() {

  }

}
