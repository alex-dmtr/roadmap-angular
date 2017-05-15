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


  saveGroup($event: any) {
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
        $("#editGroupModal").modal('hide');
        return this.getGroup();
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Error updating group");
        console.error(err);
      })
  }
}