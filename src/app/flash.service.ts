import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


export enum FlashType {
  Info,
  Error
};

export class Flash {
  id: number;

  constructor(public type: FlashType, public message: string) {

  }
}

class FlashFactory {

  private UID: number;

  constructor() {
    this.UID = 0;
  }

  createFlash(type: FlashType, message: string): Flash {
    let x: Flash = new Flash(type, message);
    x.id = this.UID++;

    return x;
  }
}

@Injectable()
export class FlashService {

  private flashFactory = new FlashFactory();
  private handlers: any[] = [];

  public items: Array<Flash>;
  public items$: Observable<Array<Flash>>;

  constructor() {

    this.items$ = new Observable<Array<Flash>>((subscriber: any) => {
      this.handlers.push(subscriber);
    })
  }

  public push(type: FlashType, message: string) {
    let newFlash = this.flashFactory.createFlash(type, message);

    this.items.push(newFlash);

    this.notifyHandlers();
  }

  public remove(flashID: number) {
    this.items = this.items.filter((item: Flash) => {
      if (item.id !== flashID)
        return item;
    });

    this.notifyHandlers();
  }

  private notifyHandlers() {
    this.handlers.forEach((subscriber: any) => {
      subscriber.next(this.items);
    });
  }


}