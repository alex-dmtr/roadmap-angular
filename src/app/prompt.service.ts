import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export enum PromptType {
  Confirm
}


export class Prompt {
  constructor(public type: PromptType, public message: string) {

  }
}

export class PromptPromise {
  prompt: Prompt;

  resolve: Function;
  reject: Function;
}



@Injectable()
export class PromptService {

  private handler: any;
  public prompt$: Observable<PromptPromise>;

  constructor() {
    this.prompt$ = new Observable<PromptPromise>((subscriber: any) => {
      if (this.handler != null)
        throw new Error("prompt$ can only have one subscriber");
      this.handler = subscriber;
    })
  }

  private prompt(prompt: Prompt): Promise<any> {
    if (this.handler == null)
      throw new Error("prompt$ has no subscriber");


    let promise = new Promise((resolve, reject) => {

      let promptPromise = new PromptPromise();

      promptPromise.prompt = prompt;
      promptPromise.resolve = resolve;
      promptPromise.reject = reject;

      this.handler.next(promptPromise);
    })

    return promise;
  }

  public promptConfirm(message: string): Promise<any> {
    return this.prompt(new Prompt(PromptType.Confirm, message));
  }
}