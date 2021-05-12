import { Component, OnInit } from '@angular/core';
import { Bonus } from 'src/app/domain/bonus';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  avgRating: number;

  personalRating: number;

  isLoggedIn: boolean = true;

  progressRate: number;

  images: any[];

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];


//11111111111111111111111

bonuses: Bonus[];

  rateCampaign(event) {
    //server request
  }

}



