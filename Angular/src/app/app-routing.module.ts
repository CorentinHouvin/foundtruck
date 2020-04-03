import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from "./auth/auth.guard";
import { MapComponent } from './pages/map/map.component';
import { MapboxComponent } from './pages/mapbox/mapbox.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: SignInComponent },
  { path: 'userprofile', component: UserProfileComponent, canActivate:[AuthGuard] },
  { path: 'map', component: MapComponent, canActivate:[AuthGuard] },
  { path: 'mapbox', component: MapboxComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
