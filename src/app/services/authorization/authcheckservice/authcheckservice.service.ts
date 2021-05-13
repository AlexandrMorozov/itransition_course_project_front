import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../tokenstorageservice/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthcheckserviceService {

  constructor(private tokenStorage: TokenStorageService) { }

  isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    const helper = new JwtHelperService();
    
    return !helper.isTokenExpired(token);
  }
}
