import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UserService } from '../../../services/component-services/user-service/user.service';
import { TokenStorageService } from '../../../services/authorization/tokenstorageservice/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/domain/campaign';
import { Bonus } from 'src/app/domain/bonus';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {

  content: string;
  user: any;
  active = 1;

  public openBindingEvent = 'dblclick';

  public name: string;
  public email: string;

  public userControl = new FormControl();
  public mailControl = new FormControl();

  campaigns: Campaign[];
  
  bonuses: Bonus[];

  userName: string;


  onCampaignsChange(campaigns: Campaign[]) {
    this.campaigns = campaigns;
    console.log(this.campaigns);
  }



  constructor(private userService: UserService, 
    private tokenStorage: TokenStorageService, 
    private route: ActivatedRoute, private router: Router) {
      this.userName = route.snapshot.params['username'];
     }
     
    updateSingleField(prop: any, control: any): void {

      this[prop] = this[control].value;
  
      if (prop === "name") {
        this.changeUserName(this[prop]);
      } else if (prop === "email") {
        this.changeUserMail(this[prop]);
      }
  
    }
  
    cancelSingleField(prop: string, control: any): void {
      (this[control] as AbstractControl).setValue(this[prop]);
    }
  
    private changeUserName(newName: string) {
  
      var userObj = this.tokenStorage.getUser();
  
      console.log(newName);
  
      this.userService.changeUserName(newName).subscribe(
        data => {
          userObj.name = newName;
          this.tokenStorage.saveUser(userObj);
  
          console.log(this.tokenStorage.getUser().name);
      },
      err => {
        this.tokenStorage.signOut();
        this.router.navigate(['home']);
      });
    }
  
  
    private changeUserMail(newMail: string) {
  
      var userObj = this.tokenStorage.getUser();
  
      this.userService.changeUserMail(userObj.email, newMail).subscribe(
        data => {
          userObj.email = newMail;
          this.tokenStorage.saveUser(userObj);
      },
      err => {

        this.tokenStorage.signOut();
        this.router.navigate(['home']);
      });
    }

  ngOnInit(): void {

    this.userService.getUserAccount(this.userName).subscribe(
      data => {

        if (data != null) {

          this.content = data;
          this.user = data;
  
          this.name = data.name;
          this.email = data.email;
  
          this.userControl = new FormControl(data.name);
          this.mailControl = new FormControl(data.email);
  
          this.campaigns = this.user.campaigns;
          this.bonuses = this.user.bonuses;

        }

      },
      err => {
        this.tokenStorage.signOut();
        this.router.navigate(['home']);
      }
    );
  }
}
