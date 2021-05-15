import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/authorization/tokenstorageservice/token-storage.service';
import { MainPageService } from '../../../services/component-services/main-page/main-page.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [MessageService]
})
export class MainPageComponent implements OnInit {

  constructor(private mainPageSrvice: MainPageService,
     private tokenService: TokenStorageService,
      private messageService: MessageService) { }

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
      }, err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err});
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
        this.messageService.add({severity:'error', summary: 'Error', detail: err});
        this.tokenService.signOut();
      }
    );
  }
}
