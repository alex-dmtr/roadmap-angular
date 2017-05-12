import { Component, OnInit } from '@angular/core';
import { FlashService, FlashType, Flash } from './flash.service';

declare var $: JQueryStatic;

@Component({
  selector: 'app-flash',
  template: `<div style="float:right"><div *ngFor="let flash of tempItems" class="alert" [class.alert-info]="flash.isInfo()"
  [class.alert-danger]="flash.isError()"  id="flash{{flash.id}}">
  {{flash.message}}
  
  </div>
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
      }, 10000);
    })

  }

  ngOnInit() {

  }
}