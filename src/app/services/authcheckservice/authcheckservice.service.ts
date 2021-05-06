import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../tokenstorageservice/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthcheckserviceService {

  constructor(/*private jwtHelper: JwtHelperService,*/ private tokenStorage: TokenStorageService) { }

  isAuthenticated(): boolean {

    //console.log(this.tokenStorage.getToken());
    const token = this.tokenStorage.getToken();
    const helper = new JwtHelperService();
    
    return !helper.isTokenExpired(token);
  }
}
