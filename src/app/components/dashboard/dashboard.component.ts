import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, of, Subscription } from 'rxjs';
import { DashboardService } from './service/dashboard.service';
import { IDashboard } from './models/dashboard';
import { IPaginatedResponse } from 'src/app/shared/models/paginated-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  @ViewChild('search') searchInput;
  searchSubscription: Subscription;
  dashboardData: IDashboard[] = [];
  // static is due to frontend pagination
  staticDashboardData: IDashboard[] = [];
  page: number = 0;
  pageSize: number = 10;
  collectionSize: number = 0;

  constructor(
    private readonly _dashboardService: DashboardService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.setUpFilter();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  setUpFilter(): void {
    this.searchSubscription = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => console.log('started searching')),
        switchMap(data => this._dashboardService.searchUsers(data['target'].value).pipe(
          tap(() => console.log('searching...')),
          catchError(() => {
            return of([]);
          })),
        ),
        tap(() => console.log('ended searching'))
      ).subscribe((data: IPaginatedResponse<IDashboard[]>) => {
        this.page = 1;
        this.dashboardData = data.items;
        this.staticDashboardData = data.items;
        this.collectionSize = this.dashboardData.length;
        this.refreshPage();
      })
  }

  refreshPage(): void {
    this.dashboardData = this.staticDashboardData
      .map((data, i) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }

  navigateToDetail(loginName: string): void {
    this.router.navigate(['detail', loginName])
  }
}
