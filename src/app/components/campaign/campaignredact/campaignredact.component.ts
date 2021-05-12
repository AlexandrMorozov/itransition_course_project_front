import { Component, OnInit } from '@angular/core';
import { Bonus } from '../../../domain/bonus';
import { CampaignService } from '../../../services/campaignservice/campaign.service';
import { DatePipe } from '@angular/common';
import { Tag } from '../../../domain/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../../../services/userservice.service';
import { Campaign } from '../../../domain/campaign';
import { User } from 'src/app/domain/user';
import { Topic } from 'src/app/domain/topic';

@Component({
  selector: 'app-campaignredact',
  templateUrl: './campaignredact.component.html',
  styleUrls: ['./campaignredact.component.css'],
  providers: [DatePipe]
})
export class CampaignredactComponent implements OnInit {

  constructor(private campaignService: CampaignService,
     private datePipe: DatePipe, private userService: UserserviceService,
      private route: ActivatedRoute, private router: Router) { }

  date = Date.now();

  bonuses: Bonus[] = [];
  
  files: File[] = [];

  tags: Tag[] = [];

  //
  images: any[] = [];

  themes: Topic[];

  selectedTheme: Topic;

  form: any = {};

  isSuccessful = false;

  errorMessage = '';

  campaign: Campaign;

  user: User;/*&&&&*/

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
      err => {console.log(err);});
  }


  getActionOwner(userName) {
    this.userService.getUserEssentials(userName).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      }, err => {
        this.router.navigate(['home']);
      }
    );
    
  }

  getEditedCampaign(campaign) {
    this.campaignService.getCampaign(campaign).subscribe(
      data => {

        this.campaign = data;
        this.bonuses = data.bonuses;
        this.tags = data.tags;
        this.selectedTheme = data.topic;
        this.form.name = data.name;
        this.form.date = data.lastDateOfCampaign;
        this.form.sum = data.sumOfMoney;
        this.form.desc = data.description;
        this.form.video = data.videoLink;

      }, err => {
        this.router.navigate(['home']);
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

  addCampaign(campaign: Campaign, formData: FormData) {
    this.campaignService.addCampaign(campaign, formData).subscribe(
      data => { console.log(data); this.router.navigate['user/'+ this.user.name]; }, 
      err => { console.log(err); });
  }

  //
  updateCampaign(campaign: Campaign, form: FormData) {
    this.campaignService.updateCampaign(campaign, form).subscribe(
        data => { console.log(data); this.router.navigate['user/'+ this.user.name]; }, 
        err => { console.log(err);} );
  }

  //
  createCampaign(): Campaign {

    var campaign: Campaign = new Campaign();

    if (this.isUpdate) {
      campaign.id = this.campaign.id;
    } else {
      campaign.id = null;
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
    this.addCampaign(campaign, formData);
  } else {
    this.updateCampaign(campaign, formData);
  }
}

  onFilesChange(files: File[]) {
    this.files = files;
  }

  onBonusesChange(bonuses: Bonus[]) {
    this.bonuses = bonuses;
  }

  //
  onImagesChange(images: any[]) {
    this.images = images;
  }

  onTagsChange(tags: Tag[]) {
    this.tags = tags;
  }


}