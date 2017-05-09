import { OnInit, Component } from '@angular/core';
import { GroupService } from './group.service';
import { Group } from './group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.template.html',
  providers: [GroupService]
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService) {

  }
  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): Promise<void> {
    return this.groupService.getGroups().then((groups) => {
      console.log(groups);
      this.groups = groups;
    });
  }
}