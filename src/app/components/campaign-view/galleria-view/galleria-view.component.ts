import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-galleria-view',
  templateUrl: './galleria-view.component.html',
  styleUrls: ['./galleria-view.component.css']
})
export class GalleriaViewComponent implements OnInit {

  constructor() { }

  @Input() images: any[];

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

  ngOnInit(): void {
  }

  getCampaignImages() {
    
  }



}
