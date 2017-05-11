import { Component, OnInit } from '@angular/core';
import { FlashService, FlashType, Flash } from './flash.service';

@Component({
  selector: 'app-flash',
  template: `<div *ngFor="let flash of tempItems" class="alert" [class.alert-info]="flash.isInfo()"
  [class.alert-danger]="flash.isError()">
  {{flash.message}}
  
  </div>`
})
export class FlashComponent implements OnInit {

  items: Flash[] = [];
  private tempItems: Flash[] = [];

  constructor(private flashService: FlashService) {
    this.items = flashService.items;
    flashService.newItem$.subscribe(newItem => {
      this.tempItems.push(newItem);

      setTimeout(() => {
        this.tempItems = this.tempItems.filter(item => {
          if (item.id !== newItem.id)
            return item;
        });

        flashService.remove(newItem.id);
      }, 5000);
    })

  }

  ngOnInit() {

  }
}