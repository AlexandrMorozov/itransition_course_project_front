import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-bonustable',
  templateUrl: './bonustable.component.html',
  styleUrls: ['./bonustable.component.css']
})
export class BonustableComponent implements OnInit {

  bonuses: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
