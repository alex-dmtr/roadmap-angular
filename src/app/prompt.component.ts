import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { PromptService, Prompt, PromptPromise } from './prompt.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.template.html'
})
export class PromptComponent {
  constructor(
    private promptService: PromptService,
    private authService: AuthService
  ) {
    this.promptService.prompt$.subscribe(promptPromise => {
      this.newPrompt(promptPromise);
    });
  }

  public prompt: Prompt;
  public promptPromise: PromptPromise;

  private newPrompt(promptPromise: PromptPromise) {
    this.promptPromise = promptPromise;
    this.prompt = promptPromise.prompt;

    setTimeout(() => {
      ($("#promptModal") as any).modal('show');

    }, 100);
  }



  private hideModal() {
    ($("#promptModal") as any).modal('hide');

  }

  private resolve(data?: any) {
    this.promptPromise.resolve(data);
    this.hideModal();
  }

  private reject(reason?: any) {
    this.promptPromise.reject(reason);
    this.hideModal();
  }

  /*
    REGION: Confirm
  */
  public yes($event: any) {
    this.resolve(true);
  }

  public no($event: any) {
    this.resolve(false);
  }

  /*
    REGION: Password
  */
  public ok($event: any) {
    let password: string = $("#password").val();

    this.authService.checkPassword(password)
      .then(ok => {
        if (!ok) {
          $("#prompt-error").text("Wrong password.");
        }
        else {
          this.resolve(true);
        }
      })
  }

  public cancel($event: any) {
    this.resolve(false);
  }
}