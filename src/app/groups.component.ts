import { OnInit, Component } from '@angular/core';
import { GroupService } from './group.service';
import { AuthService } from './auth.service';
import { FlashService, FlashType } from './flash.service';
import { Group } from './group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.template.html',
  providers: [GroupService]
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private flashService: FlashService) {

  }
  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): Promise<void> {
    return this.groupService.getGroups().then((groups) => {
      this.groups = groups;
    });
  }

  public createGroup($event: any) {
    $event.preventDefault();

    let group = new Group();

    group.name = $("#groupName").val();
    group.description = $("#groupDescription").val();
    group.avatarUrl = $("#groupAvatarUrl").val();
    group.owner = this.authService.user;

    this.groupService.createGroup(group)
      .then(response => {
        this.flashService.push(FlashType.Info, "Group created succesfully");
        ($("#createGroupModal") as any).modal('hide');
        return this.getGroups();
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Error creating group");
        console.error(err);
      })
  }

  public joinGroup($event: any, groupID: number) {
    $event.preventDefault();

    this.groupService.joinGroup(groupID, this.authService.user.id)
      .then(response => {
        this.flashService.push(FlashType.Info, `You've joined ${this.groups.find(x => x.id === groupID).name}`);
        return this.getGroups();
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Error joining group");
        console.error(err);
      })
  }
}