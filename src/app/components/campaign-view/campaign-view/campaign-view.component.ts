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

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {

  constructor(private campaignViewService: CampaignViewService,
     private tokenService: TokenStorageService, 
     private route: ActivatedRoute, private router: Router,
     private campaignService: CampaignService,
     private domSanitizer: DomSanitizer ) { }

  ngOnInit(): void {

    var campaign = this.route.snapshot.params['campaign'];
    var user = this.tokenService.getUser();

    this.getViewedCampaign(campaign, user);

    //this.getAvgCampaignRating(this.id);
  }

  //Composite parameters
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

  progressRate: number;

  getViewedCampaign(campaignName: string, user) {

    this.campaignService.getCampaign(campaignName).subscribe(
      data => {
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

        this.getAvgCampaignRating(this.id);

        if (user !== undefined && user !== null) {
          this.userName = user.name;
          this.isLoggedIn = true;
    
          console.log(this.id);
          this.getUserCampaignRating(this.id, user.id);
    
        } else { this.isLoggedIn = false;}

      }, err => {}
    );
  }

  getAvgCampaignRating(campaignId: number) {

    this.campaignViewService.getAvgCampaignRating(campaignId).subscribe(
      data => { this.avgRating = data; console.log(this.avgRating); },
       err => {}
    );
  }

  getUserCampaignRating(campaignId: number, userId: number) {
    this.campaignViewService.getUserCampaignRating(campaignId, userId).subscribe(
      data => { this.personalRating = data; console.log(this.personalRating); },
       err => {}
    );
  }

}