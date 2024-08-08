import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent},
      { path: 'add-location', component: AddLocationComponent,canActivate:[AdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }