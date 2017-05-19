import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LocalUser } from './auth.service';
import { ProfileService } from './profile.service';
import { FlashService } from './flash.service';
import { PromptService, Prompt, PromptType } from './prompt.service';
import { User } from './user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile.edit.template.html',
  providers: [ProfileService]
})
export class ProfileEditComponent implements OnInit {
  public localUser: LocalUser = new LocalUser();
  public user: User = new User()

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private flashService: FlashService,
    private promptService: PromptService,
    private router: Router
  ) {

  }

  private getUser() {

    this.profileService.getUser(this.localUser.id)
      .then(user => {
        this.user = user;
      })
  }

  ngOnInit() {
    this.promptService.promptPassword()
      .then(ok => {
        if (ok) {

          this.localUser = this.authService.user;

          this.getUser();
        }
        else {
          this.router.navigate(["/profile"]);
        }
      })
  }

  public saveUser($event: any) {
    $event.preventDefault();

    Promise.resolve(true)
      .then(ok => {
        if (ok) {
          let user: User = {
            id: this.user.id,
            username: this.user.username,
            avatarUrl: $("#avatarUrl").val(),
            email: $("#email").val(),
            description: $("#description").val(),
            age: $("#age").val(),
            currentProject: $("#currentProject").val(),
            agency: $("#agency").val()
          };

          this.profileService.saveUser(user)
            .then(response => {
              this.flashService.pushInfo("Profile saved");
              this.getUser();
              // ($("#editProfileModal") as any).modal('hide');
            })
            .catch(err => {
              console.error(err);
              this.flashService.pushError("Error saving profile");
            })
        }
      })


  }

  public deleteUser($event: any) {
    this.promptService.promptConfirm("Are you sure you want to delete your profile?\nThis cannot be undone.")
      .then(ok => {
        if (!ok) return Promise.reject(ok);
        return Promise.resolve(true);
      })
      .then(() => {
        return this.promptService.promptPassword();
      })
      .then(ok => {
        if (!ok) return Promise.reject(ok);
        return Promise.resolve(true);
      })
      .then(() => {
        this.profileService.deleteUser(this.user.id)
          .then(response => {
            return this.authService.doLogout();
          })
          .then(() => {
            this.flashService.pushInfo("Profile deleted");
          })
          .catch(err => {
            this.flashService.pushError("Can't delete profile");
            console.error(err);
          })
      })

  }
}