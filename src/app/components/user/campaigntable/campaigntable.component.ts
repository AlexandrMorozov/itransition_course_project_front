import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CampaignService } from 'src/app/services/component-services/campaignservice/campaign.service';
import { Campaign } from 'src/app/domain/campaign';
import { TokenStorageService } from 'src/app/services/authorization/tokenstorageservice/token-storage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-campaigntable',
  templateUrl: './campaigntable.component.html',
  styleUrls: ['./campaigntable.component.css'],
  providers: [MessageService]
})
export class CampaigntableComponent implements OnInit {

  @Output() onCampaignChange = new EventEmitter<Campaign[]>();

  @Input() campaigns: Campaign[];

  campaign: Campaign;

  selectedCampaigns: Campaign[];

  constructor(private campaignService: CampaignService, 
    private tokenService: TokenStorageService, private router: Router, 
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  deleteSelectedCampaigns() {

    this.campaignService.deleteCampaign(this.selectedCampaigns).subscribe(
      data => {

        this.messageService.add({severity:'success', summary: 'Message',
        detail: "Campaigns were successfuly deleted!"});

        this.campaigns = this.campaigns.filter(val => !this.selectedCampaigns.includes(val));
        this.selectedCampaigns = null;
      },
      err => {
        this.tokenService.signOut();
        this.router.navigate(['home']);
      }
    );

    this.onCampaignChange.emit(this.campaigns);

  }
    
  //!
  deleteCampaign(campaign: Campaign) {

    var campaigns: Campaign[] = [campaign];

    this.campaignService.deleteCampaign(campaigns).subscribe(
      data => {

        this.messageService.add({severity:'success', summary: 'Message',
        detail: "Campaign were successfuly deleted!"});

        this.campaigns = this.campaigns.filter(val => val.id !== campaign.id);
        this.campaign = null;
      },
      err => {
        this.tokenService.signOut();
        this.router.navigate(['home']);
      }
    );

    this.onCampaignChange.emit(this.campaigns);
  }

 
}
