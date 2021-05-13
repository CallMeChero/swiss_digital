import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { mainRoutes } from './shared/routes/main-routes';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: mainRoutes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
