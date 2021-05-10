import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bonus } from 'src/app/domain/bonus';

const API_URL = 'http://localhost:8080/campaign';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BonusServiceService {

  constructor(private http: HttpClient) { }

  addBonus(bonus: Bonus) {

    const params = new HttpParams().set("bonus", JSON.stringify(bonus));
    return this.http.get("http://localhost:8080/bonuses/add", {params});
    
  }

  deleteBonus() {

  }

  deleteBonuses() {

  }



}
