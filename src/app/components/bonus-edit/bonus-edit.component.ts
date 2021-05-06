import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Bonus } from '../../domain/bonus';

@Component({
  selector: 'app-bonus-edit',
  templateUrl: './bonus-edit.component.html',
  styleUrls: ['./bonus-edit.component.css']
})
export class BonusEditComponent implements OnInit {

  @Output() onChange = new EventEmitter<Bonus[]>();

  constructor() { }

  ngOnInit(): void {
  }

  @Input() bonuses: Bonus[];

  selectedBonuses: Bonus[];

  bonus: Bonus;

  bonusDialog: boolean;

  submitted: boolean;

  saveBonus() {
    this.submitted = true;

    if (this.bonus.id) {
      this.bonuses[this.findBonusById(this.bonus.id)] = this.bonus;   
    } else {
      this.bonuses.push(this.bonus);
    }

    this.bonuses = [...this.bonuses];
    this.bonusDialog = false;
    this.bonus = {};

    this.onChange.emit(this.bonuses);


        /*if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }
            else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }
        }*/
  }

  deleteSelectedBonuses() {
    this.bonuses = this.bonuses.filter(val => !this.selectedBonuses.includes(val));
    this.selectedBonuses = null;

    this.onChange.emit(this.bonuses);
  }

  deleteBonus(bonus: Bonus) {
    this.bonuses = this.bonuses.filter(val => val.id !== bonus.id)
    this.bonus = {};

    this.onChange.emit(this.bonuses);
  }

  findBonusById(id: number): number {

    let index = -1;

    for (let i = 0; i < this.bonuses.length; i++) {
        if (this.bonuses[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  hideDialog() {
    this.bonusDialog = false;
    this.submitted = false;
  }

  editBonus(bonus: Bonus) {
    this.bonus = {...bonus};
    this.bonusDialog = true;
  }

  createNewBonus() {
    this.bonus = {};
    this.submitted = false;
    this.bonusDialog = true;
  }

}
