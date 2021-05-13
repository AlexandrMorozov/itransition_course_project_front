import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../common/global-constants';
import { Tag } from 'src/app/domain/tag';

const API_URL = GlobalConstants.apiURL;
const httpOptions = GlobalConstants.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(API_URL + "/tags/gettags", {responseType: "json"});
  }

}
