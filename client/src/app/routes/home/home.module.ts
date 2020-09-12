import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { PoliciesTableComponent } from '@shared/policies-table/policies-table.component';

@NgModule({
  declarations: [
    PoliciesTableComponent,
    ModalComponent,

    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
