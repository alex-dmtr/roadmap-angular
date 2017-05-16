import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashService, FlashType } from './flash.service';
import { GroupService } from './group.service'
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Group } from './group';

@Component({
  selector: 'app-group',
  providers: [GroupService],
  templateUrl: './group.template.html'
})
export class GroupComponent implements OnInit {
  constructor(
    private flashService: FlashService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  public group: Group = new Group();
  public isAdmin: boolean = false;

  private getGroup(): Promise<Group> {

    return new Promise((resolve, reject) => {

      this.route.params.switchMap((params: Params) => {
        let id: number = +params['id'];
        return this.groupService.getGroup(id);
      }).subscribe(group => {
        this.group = group;
        this.isAdmin = (group.owner.id === this.authService.user.id);

        resolve(group);
      })

    })

  }
  ngOnInit() {
    this.getGroup().catch(err => {
      console.error(err);
    });

  }


  public saveGroup($event: any) {
    $event.preventDefault();

    let group = new Group();

    group.id = this.group.id;
    group.name = $("#groupName").val();
    group.description = $("#groupDescription").val();
    group.avatarUrl = $("#groupAvatarUrl").val();
    group.owner = this.authService.user;

    this.groupService.updateGroup(group)
      .then(response => {
        this.flashService.push(FlashType.Info, "Group update succesful");
        ($("#editGroupModal") as any).modal('hide');
        return this.getGroup();
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Error updating group");
        console.error(err);
      })
  }

  public deleteGroup($event: any) {
    $event.preventDefault();

    this.groupService.deleteGroup(this.group.id)
      .then(response => {
        this.flashService.push(FlashType.Info, "Group deleted");
        this.router.navigate(["groups"]);
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Group deletion failed");
        console.error(err);
      })
  }

  public leaveGroup($event: any) {
    $event.preventDefault();

    let userID = this.authService.user.id;
    let groupID = this.group.id;

    this.groupService.removeFromGroup(groupID, userID)
      .then(response => {
        this.flashService.push(FlashType.Info, `You've left ${this.group.name}`);
        this.router.navigate(["groups"]);
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Can't leave the group");
        console.error(err);
      })
  }

  public addPost($event: any) {
    $event.preventDefault();

    let message = $("#post-message").val();
    let userID = this.authService.user.id;

    this.groupService.addPost(this.group.id, userID, message)
      .then(response => {
        $("#post-message").val("");
        this.getGroup();
        this.flashService.push(FlashType.Info, "Post added");
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Can't post message");
        console.error(err);
      })
  }


  public showEditPost($event: any, postID: number) {

    $(".post .post-edit").hide();
    $(".post .post-view").show();

    $(`#post${postID} .post-edit`).show();
    $(`#post${postID} .post-view`).hide();
  }

  public hideEditPost($event: any) {

    $(".post .post-edit").hide();
    $(".post .post-view").show();
  }

  public savePost($event: any, postID: number) {
    let message = $(`#post${postID} .post-message`).val();

    this.groupService.savePost(this.group.id, postID, message)
      .then(response => {
        this.flashService.pushInfo("Post saved");
        this.getGroup();
      })
      .catch(err => {
        this.flashService.pushError("Error saving post");
        console.error(err);
      })
  }

  public deletePost($event: any, postID: number) {
    this.groupService.deletePost(this.group.id, postID)
      .then(response => {
        this.flashService.pushInfo("Post deleted");
        this.getGroup();
      })
      .catch(err => {
        this.flashService.pushError("Error deleting post");
        console.error(err);
      })
  }
}