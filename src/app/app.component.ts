import { Component } from '@angular/core';
import { TokenStorageService } from './services/tokenstorageservice/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'course';

  private roles: string[];
  isLoggedIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn);

    if (this.isLoggedIn) {

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user);

      this.username = user.name;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
}
