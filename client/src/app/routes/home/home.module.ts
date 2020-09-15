import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { DropdownComponent } from '@shared/dropdown/dropdown.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { PolicyEditComponent } from '@app/shared/policy-edit/policy-edit.component';
import { PoliciesTableComponent } from '@shared/policies-table/policies-table.component';
import { PoliciesManagerComponent } from '@shared/policies-manager/policies-manager.component';
import { PolicyService } from '@services/index';

@NgModule({
  declarations: [
    PoliciesManagerComponent,
    PoliciesTableComponent,
    PolicyEditComponent,
    ModalComponent,
    DropdownComponent,

    HomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMyDatePickerModule,

    HomeRoutingModule,
  ],
  providers: [ PolicyService ],
})
export class HomeModule { }
