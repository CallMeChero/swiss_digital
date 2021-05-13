import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { IDashboard } from '../models/dashboard';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent implements OnInit {

  user: IDashboard;
  followers: IDashboard[] = [];
  staticFollowers: IDashboard[] = [];
  page: number = 0;
  pageSize: number = 10;
  collectionSize: number = 0;

  constructor(
    private readonly _dashboardService: DashboardService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    // this could also be subscription if someone wants to manually change user inside url
    const name = this._activatedRoute.snapshot.params.loginName;

    // this could be solved by using Async methodology - Change detection strategy OnPush
    this._dashboardService.getOne(name).pipe(take(1)).subscribe(
      data => {
        //forkJoin
        this.user = data[0];
        this.followers = data[1];
        this.page = 1;
        this.staticFollowers = data[1];
        this.collectionSize = this.staticFollowers.length;
        this.refreshPage();
      }
    )
  }

  refreshPage(): void {
    this.followers = this.staticFollowers
      .map((data, i) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

}
