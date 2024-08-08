import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { WeatherReportComponent } from './weather-report/weather-report.component';
import { UserComponent } from './user.component';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  { path: '', component: UserComponent,
    children:[
        {path:'',component:UserDashboardComponent},
        { path: 'locations', component: UploadExcelComponent,canActivate:[UserGuard] },
        { path: 'weather-report/:city', component: WeatherReportComponent,canActivate:[UserGuard]  }

      
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
