import { Component, OnInit } from '@angular/core';
import { TagModel } from 'ngx-chips/core/accessor';
import { Bonus } from '../../domain/bonus';

@Component({
  selector: 'app-campaignredact',
  templateUrl: './campaignredact.component.html',
  styleUrls: ['./campaignredact.component.css']
})
export class CampaignredactComponent implements OnInit {

  bonuses: Bonus[];
  
  files: File[] = [];

  tags: TagModel[] = [];

  autoTags: TagModel[] = [];

  images: any[];
  

  constructor() { }

  onFilesChange(files: File[]) {
    this.files = files;
    console.log(this.files);
  }

  onBonusesChange(bonuses: Bonus[]) {
    this.bonuses = bonuses;
    console.log(this.bonuses);
  }

  onImagesChange(images: any[]) {
    this.images = images;
    console.log(this.images);
  }

  ngOnInit(): void {

  }

}
