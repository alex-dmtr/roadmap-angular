import { Component } from '@angular/core';
import { PromptService, Prompt, PromptPromise } from './prompt.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.template.html'
})
export class PromptComponent {
  constructor(private promptService: PromptService) {
    this.promptService.prompt$.subscribe(promptPromise => {
      this.newPrompt(promptPromise);
    });
  }

  public prompt: Prompt;
  public promptPromise: PromptPromise;

  private newPrompt(promptPromise: PromptPromise) {
    this.promptPromise = promptPromise;
    this.prompt = promptPromise.prompt;
    ($("#promptModal") as any).modal('show');
  }

  private hideModal() {
    ($("#promptModal") as any).modal('hide');

  }

  /*
    REGION: Confirm
  */
  public yes($event: any) {
    this.promptPromise.resolve(true);

    this.hideModal();
  }

  public no($event: any) {
    this.promptPromise.resolve(false);

    this.hideModal();
  }
}