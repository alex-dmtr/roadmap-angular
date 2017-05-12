import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashService } from './flash.service';
import { GroupService } from './group.service';
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
    private router: Router
  ) { }

  public group: Group = new Group();

  private getGroup(): Promise<Group> {

    return new Promise((resolve, reject) => {

      this.route.params.switchMap((params: Params) => {
        let id: number = +params['id'];
        return this.groupService.getGroup(id);
      }).subscribe(group => {
        this.group = group;
        resolve(group);
      })

    })

  }
  ngOnInit() {
    this.getGroup().then(group => {
      console.log(this.group);
    }).catch(err => {
      console.error(err);
    })

  }
}