import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userDetails;

  constructor(private userService: UserService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.userService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      } else {
        this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res['user'];
            if (next.data.roles && next.data.roles.indexOf(this.userDetails.role) === -1) {
              this.router.navigateByUrl('/login');
              this.userService.deleteToken();
              return false;
            }
          },
          err => { }
        );

        return true;
      }
  }

}
