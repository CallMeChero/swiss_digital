import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule
})
export class UrlHelper {

  private readonly baseUrl: string;
  private readonly delimter = '/';
  constructor() {
    this.baseUrl = environment.baseURL;
  }

  getUrl(...args: string[]): string {
    args.unshift(this.baseUrl);
    return args.join(this.delimter);
  }

  getQueryParameters(params: any): HttpParams {
    const parameterKeys = Object.keys(params);
    let httpParams = new HttpParams();

    for (const propertyName of parameterKeys) {
      httpParams = httpParams.append(propertyName, params[propertyName]);
    }

    return httpParams;
  }

}
