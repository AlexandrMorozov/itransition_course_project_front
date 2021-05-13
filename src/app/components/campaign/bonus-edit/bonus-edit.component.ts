import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Bonus } from '../../../domain/bonus';
import {BonusServiceService} from '../../../services/component-services/bonus-service/bonus-service.service';

@Component({
  selector: 'app-bonus-edit',
  templateUrl: './bonus-edit.component.html',
  styleUrls: ['./bonus-edit.component.css']
})
export class BonusEditComponent implements OnInit {

  @Output() onChange = new EventEmitter<Bonus[]>();

  constructor(private bonusService: BonusServiceService) { }

  ngOnInit(): void {
  }

  @Input() bonuses: Bonus[] = [];

  selectedBonuses: Bonus[] = new Array();

  bonus: Bonus;

  bonusIndex: number = null;

  bonusDialog: boolean;

  submitted: boolean;

  saveBonus() {

    console.log(this.bonus);

    this.submitted = true;

    if (this.bonusIndex == null) {

      this.bonus.id = null;
      this.bonuses.push(this.bonus);

    } else {
      this.bonuses[this.bonusIndex] = this.bonus;
    }

    this.bonuses = [...this.bonuses];
    this.bonusDialog = false;
    this.bonus = {};
    this.bonusIndex = null;

    this.onChange.emit(this.bonuses);
  }

  deleteSelectedBonuses() {
    this.bonuses = this.bonuses.filter(val => !this.selectedBonuses.includes(val));
    this.selectedBonuses = null;

    this.onChange.emit(this.bonuses);
  }

  deleteBonus(bonus: Bonus) {

    this.bonuses = this.bonuses.filter(val => val !== bonus)
    this.bonus = {};
    this.bonusIndex = null;

    console.log(this.bonuses);

    this.onChange.emit(this.bonuses);
  }

  hideDialog() {
    this.bonusDialog = false;
    this.submitted = false;
  }

  editBonus(bonus: Bonus) {

    this.bonusIndex = this.bonuses.findIndex(val => bonus);

    console.log(this.bonusIndex);

    this.bonus = {...bonus};

    this.bonusDialog = true;

    console.log(this.bonuses);
  }

  createNewBonus() {
    this.bonus = {};
    this.bonusIndex = null;
    this.submitted = false;
    this.bonusDialog = true;

    console.log(this.bonuses);
  }

}
