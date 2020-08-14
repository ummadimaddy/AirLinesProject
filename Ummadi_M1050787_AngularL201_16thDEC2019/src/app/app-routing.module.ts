import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAccessGuard } from './accessAdmin.guard';
import { StaffAccessGuard } from './accessStaff.guard';
import { LoginComponent } from './core/layout/partials/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(mod => mod.StaffModule),
    canActivate: [StaffAccessGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AdminAccessGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
