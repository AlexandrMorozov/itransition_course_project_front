import { Component, OnInit } from '@angular/core';
//import { TagModel } from 'ngx-chips/core/accessor';
import { Bonus } from '../../../domain/bonus';
import { CampaignService } from '../../../services/campaignservice/campaign.service';
import { DatePipe } from '@angular/common';
//import {FormBuilder} from "@angular/forms";
import { Tag } from '../../../domain/tag';
//import { Topic } from '../../../domain/topic';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../../../services/userservice.service';
import { Campaign } from '../../../domain/campaign';

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

  images: any[] = [];

  themes: any[];

  selectedTheme: any;

  form: any = {};

  isSuccessful = false;

  errorMessage = '';

  campaign: any;

  user: any;

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


  getActionOwner(userName) {
    this.userService.getUserAccount(userName).subscribe(
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

        console.log("1111111111111111");
        console.log(data);

        console.log(data.id);

        this.campaign = data;
        this.bonuses = data.bonuses;
        this.tags = data.tags;
        //document.getElementById('topic').innerText = data.topic;
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

    var theme;
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
    for (var i = 0; i < this.tags.length; i++) {
      if (!Number.isInteger(this.tags[i].id)) {
        this.tags[i].id = null;
      }
    }
  }

  addCampaign(topic, tags/*, formData: FormData*/) {

    var id: number;

   // console.log(this.user);
   //console.log(campaign.user);

    this.campaignService.addCampaign(this.form, tags,
      this.bonuses, topic, this.user/*, formData*/).subscribe(
      data => { console.log(data), id = data.index; }, 
      err => { console.log(err);});

      console.log(id);

      return id;
  }

  //
  updateCampaign(topic, tags) {


    this.campaignService.updateCampaign(this.form, tags,
      this.bonuses, topic, this.user, this.campaign.id/*campaign*/).subscribe(
        data => { console.log(data) }, 
        err => { console.log(err);});
  }

  //
  /*createCampaign(): Campaign {
    var campaign: Campaign = new Campaign();

    if (this.isUpdate) {
      campaign.id = this.campaign.id;
      campaign.lastUpdateDate = new Date();
    } else {
      campaign.id = null;
      campaign.lastUpdateDate = this.form.date;
    }

    campaign.name = this.form.name;
    campaign.description = this.form.description;
    campaign.videoLink = this.form.video;
    campaign.sumOfMoney = this.form.sum;
    campaign.tags = this.tags;
    campaign.bonuses = this.bonuses;
    campaign.topic = this.findSelectedTopic();
    campaign.user = this.user;
    campaign.lastUpdateDate = this.form.date;

    return campaign;

  }*/


  //
  onSubmit() {

  this.reformatTags();
  
  var topic = this.findSelectedTopic();

  var formData = this.prepareImagesForUploading();

  var f: number;

  if (!this.isUpdate) {
    f = this.addCampaign(topic, this.tags/*, formData*/);
    this.campaignService.uploadImages(formData, this.form.name);
  } else {
    this.updateCampaign(topic, this.tags);
    this.campaignService.uploadImages(formData, this.form.name);
  }



  var sf ="s";

  /*if ( f != null) {
    var formData = this.prepareImagesForUploading();

    this.campaignService.uploadImages(formData, f).subscribe(
      data => {console.log(data);}, err => { console.log(err);});
    }*/
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

  loadAllCampaignsTopics() {
    this.campaignService.getAllThemes().subscribe(
      data => {
         this.themes = data.topics;

      console.log(this.themes)},
      err => {console.log(err);});
  }

}