import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CampaignService } from 'src/app/services/campaignservice/campaign.service';
import { Campaign } from 'src/app/domain/campaign';

@Component({
  selector: 'app-campaigntable',
  templateUrl: './campaigntable.component.html',
  styleUrls: ['./campaigntable.component.css']
})
export class CampaigntableComponent implements OnInit {

  @Output() onCampaignChange = new EventEmitter</*any[]*/Campaign[]>();

  @Input() campaigns: /*any[]*/Campaign[];

  campaign: /*any*/Campaign;

  selectedCampaigns: /*any[]*/Campaign[];

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
  }

  deleteSelectedProducts() {

    this.campaignService.deleteCampaign(this.selectedCampaigns).subscribe(
      data => {
        console.log("succ");
        this.campaigns = this.campaigns.filter(val => !this.selectedCampaigns.includes(val));
        this.selectedCampaigns = null;
      },
      err => {
        console.log("fail");
      }
    );

    this.onCampaignChange.emit(this.campaigns);

  }
    
  //!
  deleteProduct(campaign: /*any*/Campaign) {

    var campaigns: Campaign[] = [campaign];

    this.campaignService.deleteCampaign(campaigns).subscribe(
      data => {
        console.log("succ");
        this.campaigns = this.campaigns.filter(val => val.id !== campaign.id);
        this.campaign = null;
      },
      err => {
        console.log("err");
      }
    );

    this.onCampaignChange.emit(this.campaigns);
  }

 
}
