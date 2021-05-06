import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';
import { TokenStorageService } from '../../services/tokenstorageservice/token-storage.service';
import { ActivatedRoute } from '@angular/router';
/*import { CampaignService } from 'src/app/services/campaignservice/campaign.service';*/

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

  campaigns: any[];

  /*campaign: any;

  selectedCampaigns: any[];*/

  bonuses: any[];


  onCampaignsChange(campaigns: any[]) {
    this.campaigns = campaigns;
    console.log(this.campaigns);
  }



  constructor(private userService: UserserviceService, 
    private tokenStorage: TokenStorageService, private route: ActivatedRoute,
    /*private campaignService: CampaignService*/) { }

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
        console.log(err);
        this.content = JSON.parse(err.error).message;
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
        console.log(err);
        this.content = JSON.parse(err.error).message;
      });
    }

    /*//*/

    /*//*/


  ngOnInit(): void {

    const userObj = this.tokenStorage.getUser();

    console.log(userObj.name);

    this.userService.getUserAccount(userObj.name).subscribe(
      data => {
        this.content = data;
        this.user = data;

        this.name = data.name;
        this.email = data.email;

        this.userControl = new FormControl(data.name);
        this.mailControl = new FormControl(data.email);

        this.campaigns = this.user.campaigns;

        console.log(data.campaigns);

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

  }

}
