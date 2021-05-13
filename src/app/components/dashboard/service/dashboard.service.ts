import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { IDashboard } from 'src/app/components/dashboard/models/dashboard';
import { IPaginatedResponse } from 'src/app/shared/models/paginated-response';

@Injectable({
  providedIn: 'any',
})
export class DashboardService {

  constructor(
    private readonly _http: HttpClient,
    private readonly _urlHelper: UrlHelper,
  ) { }

  getOne(name: string): Observable<[IDashboard, IDashboard[]]> {
    const userUrl: string = this._urlHelper.getUrl('users', name);
    const followersUrl: string = this._urlHelper.getUrl('users', name, 'followers');
    return forkJoin([
      this._http.get<IDashboard>(userUrl),
      this._http.get<IDashboard[]>(followersUrl)
    ])
  }

  searchUsers(term: string): Observable<IPaginatedResponse<IDashboard[]>> {
    const url: string = this._urlHelper.getUrl('search', 'users');
    const queryParams: HttpParams = this._urlHelper.getQueryParameters({ q: term });
    if (term === '') {
      return of<IPaginatedResponse<IDashboard[]>>({
        total_count: 0,
        items: [],
        incomplete_results: true
      });
    }
    return this._http.get<IPaginatedResponse<IDashboard[]>>(url, { params: queryParams });
  }
}
