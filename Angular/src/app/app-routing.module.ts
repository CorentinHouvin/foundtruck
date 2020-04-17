import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";
import { Role } from './models/role.model';

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MapComponent } from './pages/map/map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
  // Route for all
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: SignInComponent },
  { path: 'userprofile', component: UserProfileComponent, canActivate:[AuthGuard] },

  // Route for consumers
  { path: 'accueil', component: HomeComponent, canActivate: [AuthGuard], data: { roles: [Role.Consumer] } },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard], data: { roles: [Role.Consumer]} },
  { path: 'favoris', component: FavoriteComponent, canActivate: [AuthGuard], data: { roles: [Role.Consumer] } },
  { path: 'recherche', component: SearchComponent, canActivate: [AuthGuard], data: { roles: [Role.Consumer] } },

  // Route for foodtrucks
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Foodtruck] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
