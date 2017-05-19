import { Component, OnInit } from '@angular/core';
import { AuthService, LocalUser } from './auth.service';
import { ProfileService } from './profile.service';
import { FlashService } from './flash.service';
import { PromptService, Prompt, PromptType } from './prompt.service';
import { User } from './user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.template.html',
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  public localUser: LocalUser = new LocalUser();
  public user: User = new User()

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private flashService: FlashService,
    private promptService: PromptService
  ) {

  }

  private getUser() {

    this.profileService.getUser(this.localUser.id)
      .then(user => {
        this.user = user;
      })
  }

  ngOnInit() {
    this.localUser = this.authService.user;

    this.getUser();
  }



}