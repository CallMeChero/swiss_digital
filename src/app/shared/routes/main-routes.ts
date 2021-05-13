import { Routes } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { DashboardDetailComponent } from '../../components/dashboard/dashboard-detail/dashboard-detail.component';

export const mainRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:loginName',
    component: DashboardDetailComponent
  },
  { path: '**', redirectTo: 'dashboard' }
];
