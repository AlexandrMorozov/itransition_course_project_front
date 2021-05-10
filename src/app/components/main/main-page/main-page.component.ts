import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../../../services/main-page/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private mainPageSrvice: MainPageService) { }

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
        console.log(err);
      }
    );
  }

  loadLastUpdatedCampaigns() {
    this.mainPageSrvice.loadLastUpdatedCampaigns().subscribe(
      data => {
        this.lastUpdatedCampaigns = data;
        console.log(data.campaigns);
      }, err => {
        console.log(err);
      }
    );
  }

}
