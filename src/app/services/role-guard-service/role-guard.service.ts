import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthcheckserviceService } from '../authcheckservice/authcheckservice.service';
import { TokenStorageService } from '../tokenstorageservice/token-storage.service';
/*import decode from 'jwt-decode';*/

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private auth: AuthcheckserviceService, private router: Router,
     private tokenStorage: TokenStorageService) { }

     canActivate(route: ActivatedRouteSnapshot): boolean {
       
      if (!this.auth.isAuthenticated()) {

        this.router.navigate(['login']);
          return false;

      } else {

        let roleMatch: boolean = false;
        const expectedRoles: string[] = route.data.expectedRoles;
        const token = /*this.tokenStorage.getToken()*/this.tokenStorage.getUser().token;
        const userRoles: string[] = this.tokenStorage.getUser().roles;

        for (let i = 0; i < expectedRoles.length; i++) {
          for (let j = 0; j < userRoles.length; j++) {
            if (expectedRoles[i] === userRoles[j]) {
              console.log(expectedRoles[j] + " " + userRoles[i] );     
              roleMatch = true;
              break;
            }
          }
        }
  
        if (roleMatch == false) {
          this.router.navigate(['']);
          return false;
        }

      }
     /* const tokenPayload = decode(token);*/
      return true;
     }

}
