import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddLocationComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ToastrModule
  ]
})
export class AdminModule { }