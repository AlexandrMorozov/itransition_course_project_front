import { Component } from '@angular/core';
import { Roles } from './domain/roles';
import { TokenStorageService } from './services/authorization/tokenstorageservice/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'course';

  private roles: string[];

  isLoggedIn: boolean = false;

  isAdmin: boolean = false;

  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const user = this.tokenStorageService.getUser();

      this.roles = user.roles;

      var adminRole = this.roles.find(val => val == Roles.ROLE_ADMIN);

      if (adminRole != undefined) {
        this.isAdmin = true;
      }

      this.username = user.name;
    }

  }


  logout() {

    this.tokenStorageService.signOut();

    window.location.reload();
  }
  
}
