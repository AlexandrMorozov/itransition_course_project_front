import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { UserserviceService } from '../../../services/userservice.service';
import { TokenStorageService } from '../../../services/tokenstorageservice/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/domain/campaign';
import { Bonus } from 'src/app/domain/bonus';
/*import { MessageService } from 'primeng/api'*/;
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

  campaigns: /*any[]*/Campaign[];
  
  bonuses: /*any[]*/Bonus[];

  userName: string;


  onCampaignsChange(campaigns: /*any[]*/Campaign[]) {
    this.campaigns = campaigns;
    console.log(this.campaigns);
  }



  constructor(private userService: UserserviceService, 
    private tokenStorage: TokenStorageService, private route: ActivatedRoute, private router: Router/*, private messageService: MessageService*/) {
      this.userName = route.snapshot.params['username'];
      console.log(this.userName);
      console.log(route);
     }

     //!!
    updateSingleField(prop: any, control: any): void {

      this[prop] = this[control].value;
  
      if (prop === "name") {
        this.changeUserName(this[prop]);
      } else if (prop === "email") {
        this.changeUserMail(this[prop]);
      }
  
    }
  
    //
    cancelSingleField(prop: string, control: any): void {
      (this[control] as AbstractControl).setValue(this[prop]);
    }
  
    //
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

  ngOnInit(): void {

    this.userService.getUserAccount(this.userName).subscribe(
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
        this.router.navigate(['home']);
        //this.messageService.add({severity:'', summary: 'Failure', detail: JSON.parse(err.error).message, life: 2000});
      }
    );
  }
}
