import { Component, OnInit } from '@angular/core';
import { AuthService, LocalUser } from './auth.service';
import { ProfileService } from './profile.service';
import { FlashService } from './flash.service';
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
    private flashService: FlashService
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

  public saveUser($event: any) {
    $event.preventDefault();

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

  public deleteUser($event: any) {
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
  }

}