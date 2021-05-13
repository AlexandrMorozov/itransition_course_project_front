import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/authorization/tokenstorageservice/token-storage.service';
import { MainPageService } from '../../../services/component-services/main-page/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private mainPageSrvice: MainPageService,
     private tokenService: TokenStorageService) { }

  mostRatedCampaigns: any[];

  lastUpdatedCampaigns: any[];

  ngOnInit(): void {

    this.loadMostRatedCampaigns();
    this.loadLastUpdatedCampaigns();

  }

  loadMostRatedCampaigns() {
    this.mainPageSrvice.loadMostRatedCampaigns().subscribe(
      data => {
        this.mostRatedCampaigns = data;
        console.log(data);
      }, err => {
        this.tokenService.signOut();
      }
    );
  }

  loadLastUpdatedCampaigns() {
    this.mainPageSrvice.loadLastUpdatedCampaigns().subscribe(
      data => {
        this.lastUpdatedCampaigns = data;
        console.log(data.campaigns);
      }, err => {
        this.tokenService.signOut();
      }
    );
  }
}
