import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Roles } from 'src/app/domain/roles';
import { AuthcheckserviceService } from '../authcheckservice/authcheckservice.service';
import { TokenStorageService } from '../tokenstorageservice/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignGuardService {

  constructor() { }
}


/*probably should be deleted*/
@Injectable({
  providedIn: 'root'
})
export class UserContentGuardService implements CanActivate {

  constructor(private auth: AuthcheckserviceService, private router: Router,
    private tokenStorage: TokenStorageService) { }
  

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    var targetName = route.params.username;

    var userName = this.tokenStorage.getUser().name;

    const userRoles: string[] = this.tokenStorage.getUser().roles;

    var isAdmin = userRoles.find(role => role == Roles.ROLE_ADMIN);

    if ( isAdmin == undefined && targetName != userName) {

      this.router.navigate(['home']);
      return false;

    }

    return true;
  }

}
