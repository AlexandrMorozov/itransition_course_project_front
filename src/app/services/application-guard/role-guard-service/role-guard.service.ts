import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthcheckserviceService } from '../../authorization/authcheckservice/authcheckservice.service';
import { TokenStorageService } from '../../authorization/tokenstorageservice/token-storage.service';
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

        const expectedRoles: string[] = route.data.expectedRoles;
        const token = this.tokenStorage.getUser().token;
        const userRoles: string[] = this.tokenStorage.getUser().roles;

        console.log(userRoles);
  
        if (!this.findRolesMatch(expectedRoles, userRoles)) {
          this.router.navigate(['home']);
          return false;
        }

      }

      return true;
     }

     findRolesMatch(expectedRoles, userRoles) {
      for (let i = 0; i < expectedRoles.length; i++) {

        for (let j = 0; j < userRoles.length; j++) {

          if (expectedRoles[i] === userRoles[j]) {
            return true;
          }
        }
      }
      return false;
     }

}
