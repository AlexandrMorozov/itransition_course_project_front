import { Component, OnInit } from '@angular/core';
import { Bonus } from '../../../domain/bonus';
import { CampaignService } from '../../../services/component-services/campaignservice/campaign.service';
import { DatePipe } from '@angular/common';
import { Tag } from '../../../domain/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/component-services/user-service/user.service';
import { Campaign } from '../../../domain/campaign';
import { User } from 'src/app/domain/user';
import { Topic } from 'src/app/domain/topic';
import { TokenStorageService } from 'src/app/services/authorization/tokenstorageservice/token-storage.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-campaignredact',
  templateUrl: './campaignredact.component.html',
  styleUrls: ['./campaignredact.component.css'],
  providers: [DatePipe, MessageService]
})
export class CampaignredactComponent implements OnInit {

  constructor(private campaignService: CampaignService,
      private userService: UserService,
      private route: ActivatedRoute, private router: Router,
       private tokenService: TokenStorageService,
       private messageService: MessageService) { }

  date = Date.now();

  bonuses: Bonus[] = [];
  
  files: File[] = [];

  tags: Tag[] = [];

  images: any[] = [];

  themes: Topic[];

  selectedTheme: Topic;

  form: any = {};

  isSuccessful = false;

  errorMessage = '';

  campaign: Campaign;

  user: User;

  isUpdate: boolean = false;

  ngOnInit(): void {

    var campaign = this.route.snapshot.params['campaign'];
    var userName = this.route.snapshot.params['username'];

    this.loadAllCampaignsTopics();

    this.getActionOwner(userName);

    if (campaign != undefined) {

      this.isUpdate = true;

      this.getEditedCampaign(campaign);
    }
  }

  loadAllCampaignsTopics() {
    this.campaignService.getAllThemes().subscribe(
      data => {
         this.themes = data;

      console.log(this.themes)},
      err => {
        this.tokenService.signOut();
        this.router.navigate(['home']);
      });
  }


  getActionOwner(userName) {
    this.userService.getUserEssentials(userName).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      }, err => {
        this.tokenService.signOut();
        this.router.navigate(['home']);
      }
    );
    
  }

  getEditedCampaign(campaign) {
    this.campaignService.getCampaign(campaign).subscribe(
      data => {

        if (data == null) {

          this.messageService.add({severity:'error', summary: 'Message',
          detail: "Requested campaign dont exist!"});

        } else {

          this.campaign = data;
          this.bonuses = data.bonuses;
          this.tags = data.tags;
          this.selectedTheme = data.topic;
          this.form.name = data.name;
          this.form.date = data.lastDateOfCampaign;
          this.form.sum = data.sumOfMoney;
          this.form.desc = data.description;
          this.form.video = data.videoLink;

        }

      }, err => {
        this.router.navigate(['home']);
        this.tokenService.signOut();
      }
    );

  }


  findSelectedTopic() {

    var themeName = document.getElementById('topic').innerText;

    var theme: Topic;
    for (var i = 0; i < this.themes.length; i++) {
      if (this.themes[i].theme === themeName) {

        theme = this.themes[i];
      }
    }

    return theme;
  }

  prepareImagesForUploading() {

    var formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("image", this.files[i]);
    }

    return formData;

  }

  reformatTags() {

    this.tags.forEach(function(tag) { 
      if(!Number.isInteger(tag.id)) { 
        tag.id = null;
      }
    });

  }

  addCampaign(formData: FormData) {
    this.campaignService.addCampaign(formData).subscribe(
      data => {
        console.log(data);
        if (data == true) {
        
          this.router.navigate(["user/" + this.user.name]); 
        } else {
          this.messageService.add({severity:'error', summary: 'Message',
          detail: "Campaign with such name already exists!"});
        }
      }, 
      err => { console.log(err); });
  }

  //
  updateCampaign(form: FormData) {
    this.campaignService.updateCampaign(form).subscribe(
        data => {console.log("user/" + this.user.name);  this.router.navigate(["user/" + this.user.name]); }, 
        err => { console.log(err);} );
  }

  //
  createCampaign(): Campaign {

    var campaign: Campaign = new Campaign();

    if (this.isUpdate) {
      campaign.id = this.campaign.id;
      campaign.sumOfFundedMoney = this.campaign.sumOfFundedMoney;
      //
      campaign.pictures = this.campaign.pictures;
      //
    } else {
      campaign.id = null;
      campaign.sumOfFundedMoney = 0;
    }

    
    campaign.name = this.form.name;
    campaign.description = this.form.desc;
    campaign.videoLink = this.form.video;
    campaign.sumOfMoney = this.form.sum;
    campaign.tags = this.tags;
    campaign.bonuses = this.bonuses;
    campaign.topic = this.findSelectedTopic();
    campaign.lastUpdateDate = new Date();
    campaign.lastDateOfCampaign = this.form.date;
    campaign.user =  this.user;

    return campaign;
  }

  //
  onSubmit() {


  this.reformatTags();

  var formData = this.prepareImagesForUploading();
  var campaign: Campaign = this.createCampaign();

  formData.append("campaign", JSON.stringify(campaign));

  if (!this.isUpdate) {
    this.addCampaign(formData);
  } else {
    this.updateCampaign(formData);
  }

  this.router.navigate['home'];

}

  onFilesChange(files: File[]) {
    this.files = files;
  }

  onBonusesChange(bonuses: Bonus[]) {
    this.bonuses = bonuses;
  }

  onImagesChange(images: any[]) {
    this.images = images;
  }

  onTagsChange(tags: Tag[]) {
    this.tags = tags;
  }


}