import { Component } from '@angular/core';
import { PromptService, Prompt, PromptPromise } from './prompt.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.template.html'
})
export class PromptComponent {
  constructor(
    private promptService: PromptService
  ) {
    this.promptService.prompt$.subscribe(promptPromise => {
      let data = prompt(promptPromise.prompt.message);
      if (data == null)
        return promptPromise.reject();
      promptPromise.resolve(data);
    })
  }
}