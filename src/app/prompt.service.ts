import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export enum PromptType {
  Confirm,
  Password
}


export class Prompt {
  constructor(public type: PromptType, public message: string) {

  }

  public isConfirm(): boolean {
    return this.type === PromptType.Confirm;
  }

  public isPassword(): boolean {
    return this.type === PromptType.Password
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
  private currentPromise: Promise<any>;
  private promiseQueue: PromptPromise[] = [];

  constructor() {
    this.prompt$ = new Observable<PromptPromise>((subscriber: any) => {
      if (this.handler != null)
        throw new Error("prompt$ can only have one subscriber");
      this.handler = subscriber;
    })
  }

  private nextInQueue() {

    if (this.promiseQueue.length > 0) {
      this.handler.next(this.promiseQueue[0]);
    }
  }
  private prompt(prompt: Prompt): Promise<any> {
    if (this.handler == null)
      throw new Error("prompt$ has no subscriber");

    let promise = new Promise((resolve, reject) => {

      let promptPromise = new PromptPromise();

      promptPromise.prompt = prompt;
      promptPromise.resolve = (data: any) => {
        this.promiseQueue.shift();
        resolve(data);
      };
      promptPromise.reject = (reason: any) => {
        this.promiseQueue.shift();
        reject(reason);
      };

      this.promiseQueue.push(promptPromise);
      if (this.promiseQueue.length === 1) {
        this.handler.next(this.promiseQueue[0]);
      }
      // this.handler.next(promptPromise);
    })

    return promise;
  }

  public promptConfirm(message: string = "Are you sure you want to take this action?"): Promise<any> {
    return this.prompt(new Prompt(PromptType.Confirm, message));
  }

  public promptPassword(message: string = "Please re-enter your password."): Promise<any> {
    return this.prompt(new Prompt(PromptType.Password, message));
  }
}