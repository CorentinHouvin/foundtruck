import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MapComponent } from './pages/map/map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard } from "./auth/auth.guard";
import { Role } from './models/role.model';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: SignInComponent },
  { path: 'userprofile', component: UserProfileComponent, canActivate:[AuthGuard] },
  { path: 'mapbox', component: MapComponent, canActivate: [AuthGuard], data: { roles: [Role.Consumer]} },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Foodtruck] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
