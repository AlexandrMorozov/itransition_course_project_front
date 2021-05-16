import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bonus } from 'src/app/domain/bonus';
import { Picture } from 'src/app/domain/picture';
import { Tag } from 'src/app/domain/tag';
import { Topic } from 'src/app/domain/topic';
import { TokenStorageService } from 'src/app/services/authorization/tokenstorageservice/token-storage.service';
import { CampaignService } from 'src/app/services/component-services/campaignservice/campaign.service';
import { CampaignViewService } from 'src/app/services/component-services/user-view-service/campaign-view.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Campaign } from 'src/app/domain/campaign';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css'],
  providers: [MessageService]
})
export class CampaignViewComponent implements OnInit {

  constructor(private campaignViewService: CampaignViewService,
     private tokenService: TokenStorageService, 
     private route: ActivatedRoute, private router: Router,
     private campaignService: CampaignService,
     private domSanitizer: DomSanitizer,
     private messageService: MessageService ) { }

  ngOnInit(): void {

    var campaign = this.route.snapshot.params['campaign'];
    var user = this.tokenService.getUser();

    this.getViewedCampaign(campaign, user);
  }

  //Composite parameters

  campaign: Campaign;

  images: Picture[];

  bonuses: Bonus[];

  tags: Tag[];

  topic: Topic;

//Simple parameters
  id: number;
 
  name: string;

  description: string;

  videoLink: SafeResourceUrl;

  lastDateOfCampaign: Date;

  sumOfMoney: number;

  sumOfFundedMoney: number; 

  //Rating parameters
  userName: string = null;

  avgRating: number;

  personalRating: number;

  isLoggedIn: boolean = false;

  isCampaignRated: boolean = false;

  progressRate: number;

  //Donation
  donationDialog: boolean = false;

  donationSum: number = null;

  getViewedCampaign(campaignName: string, user) {

    this.campaignService.getCampaign(campaignName).subscribe(
      data => {

        if (data == null) {
          this.messageService.add({severity:'error', summary: 'Message',
          detail: "Requested campaign dont exist!"});
        } else {

          this.campaign = data;

          //Composite args
          this.images = data.pictures;
          this.bonuses = data.bonuses;
          this.tags = data.tags;
          this.topic = data.topic;
  
          //Simple args
          this.id = data.id;
          this.name = data.name;
          this.description = data.description;
          this.videoLink = this.domSanitizer.bypassSecurityTrustResourceUrl(data.videoLink);
          this.sumOfMoney = data.sumOfMoney;
          this.lastDateOfCampaign = data.lastDateOfCampaign;
          this.sumOfFundedMoney = data.sumOfFundedMoney;
  
          this.progressRate = this.sumOfFundedMoney / (this.sumOfMoney / 100);
  
  
          this.getAvgCampaignRating(this.id);
  
          if (user !== undefined && user !== null) {
            this.userName = user.name;
            this.isLoggedIn = true;
      
            console.log(this.id);
  
            this.getUserCampaignRating(this.id, user.id);
      
          } else { this.isLoggedIn = false;}

        }
      }, err => {}
    );
  }

  getAvgCampaignRating(campaignId: number) {

    this.campaignViewService.getAvgCampaignRating(campaignId).subscribe(
      data => { this.avgRating = data; console.log(this.avgRating); },
       err => {
         this.messageService.add({severity:'error', summary: 'Error', detail: err});
       }
    );
  }

  getUserCampaignRating(campaignId: number, userId: number) {
    this.campaignViewService.getUserCampaignRating(campaignId, userId).subscribe(
      data => { 
        this.personalRating = data; 
        this.isCampaignRated = this.personalRating != null ? true : false;
      },
       err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err});
       }
    );
  }

  rateCampaign(event) {

    if (event.value != 0) {

      var userId: number = this.tokenService.getUser().id;

      this.campaignViewService.rateCampaign(userId, this.name, event.value).subscribe(
        data => {
          this.messageService.add({severity:'success', summary: 'Success', detail: "111"});
          console.log(data);
           this.isCampaignRated = true;
           this.getAvgCampaignRating(this.id);

          }, err => {
            this.messageService.add({severity:'error', summary: 'Error', detail: err});
          }
      );
    }

  }

  sendDonation() {

    console.log(this.donationSum);

    var donatedSum = this.donationSum;

    console.log(isNaN(donatedSum));

    if (donatedSum == null || isNaN(donatedSum)) {
      this.messageService.add({severity:'error', summary: 'Message',
       detail: "In order to donate you must provide sum value!"});
    } else {

      this.campaignViewService.donateSum(donatedSum, this.id).subscribe(
        data => {
          this.messageService.add({severity:'success', summary: 'Success', detail: "Your donatinon accepted!"});
        
          this.sumOfFundedMoney = this.sumOfFundedMoney + donatedSum;
          this.progressRate = (this.sumOfFundedMoney + this.donationSum) / (this.sumOfMoney / 100);
        }, err => {
          console.log(err);
        }
      );

    }

    this.donationDialog = false;
    this.donationSum = null;
  }

  openDonationDialog() {
    this.donationDialog = true;
    this.donationSum = null;
  }

  hideDonationDialog() {
    this.donationDialog = false;
    this.donationSum = 0;
  }

  purchaseBonus(bonus: Bonus) {

    var userId: number = this.tokenService.getUser().id;

    this.campaignViewService.purchaseBonus(userId, bonus, this.campaign).subscribe(
      data => {
        if (data == true) {
          this.messageService.add({severity:'success', summary: 'Message', detail: "Bonus has been purchased!"});
        } else {
          this.messageService.add({severity:'error', summary: 'Message', detail: "You already own this bonus!"});
        }

        this.sumOfFundedMoney = this.sumOfFundedMoney + bonus.sum;
        this.progressRate = (this.sumOfFundedMoney + this.donationSum) / (this.sumOfMoney / 100);
      }, err => {
        console.log("def");
      }
    );

  }

}