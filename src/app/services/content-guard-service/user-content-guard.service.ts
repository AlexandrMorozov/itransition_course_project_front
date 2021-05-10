import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthcheckserviceService } from '../authcheckservice/authcheckservice.service';
import { TokenStorageService } from '../tokenstorageservice/token-storage.service';
import { ExistanceCheckService } from '../existance-check/existance-check.service';

@Injectable({
  providedIn: 'root'
})

export class UserContentGuardService implements CanActivate {

  constructor(private auth: AuthcheckserviceService, private router: Router,
    private tokenStorage: TokenStorageService, private existanceCheckService: ExistanceCheckService) { }
  

  canActivate(route: ActivatedRouteSnapshot): boolean {

    

    var targetName = route.params.username;
    console.log(targetName);
    var userName = this.tokenStorage.getUser().name;
    const userRoles: string[] = this.tokenStorage.getUser().roles;
/*
    var answer = null;

    this.existanceCheckService.isUserExists(targetName).subscribe(
      data => {
        console.log(data);
        answer = data;
      }, err => {

        console.log(err);
      }
    );
*/
  /*  console.log(answer);*/

  /* if (!this.isUserExisis(targetName)) {
     console.log("ddddddddddd");
    this.router.navigate(['home']);

    return false;

   } else {

    var isAdmin = userRoles.find(role => role == 'ROLE_ADMIN');

    if ( isAdmin == undefined && targetName != userName) {
      console.log("ddddeeeyyyyyyyyyy");
      this.router.navigate(['home']);
      return false;
    }

   }*/

   var isAdmin = userRoles.find(role => role == 'ROLE_ADMIN');

   if ( isAdmin == undefined && targetName != userName) {
     console.log("ddddeeeyyyyyyyyyy");
     this.router.navigate(['home']);
     return false;
   }

    return true;
  }

  isUserExisis(username): boolean {

    var answer = null;

    this.existanceCheckService.isUserExists(username).subscribe(
      data => {
        console.log(data);
        answer = data;
      }, err => {

        console.log(err);
      }
    );

    console.log(answer);

    return answer;
  }

}
