import { Component, OnInit } from '@angular/core';
import { Bonus } from 'src/app/domain/bonus';

@Component({
  selector: 'app-bonuses-view',
  templateUrl: './bonuses-view.component.html',
  styleUrls: ['./bonuses-view.component.css']
})
export class BonusesViewComponent implements OnInit {

  constructor() { }

  bonuses: Bonus[];

  ngOnInit(): void {
  }

}
