import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    HttpClientModule
  ]
})
export class SharedModule { }

