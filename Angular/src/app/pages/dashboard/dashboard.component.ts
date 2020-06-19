import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from 'src/app/services/user.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public foodtruckDetails;
  public seeAside;
  public buttonText;

  constructor(
    private userService: UserService,
    private foodtruckService: FoodtruckService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodtruckService.getFoodtruckProfile().subscribe(
      res => {
        this.foodtruckDetails = res['foodtruck'];

        this.foodtruckDetails.open ? this.buttonText = 'Ouvert' : this.buttonText = 'Fermé';
      },
      err => { }
    );
  }

  toggleAside() {
    this.seeAside = !this.seeAside;
  }

  checkAside() {
    if (this.seeAside) {
      this.seeAside = !this.seeAside;
    }
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  toggleOpen () {
    this.foodtruckDetails.open = !this.foodtruckDetails.open;
    this.foodtruckDetails.open ? this.buttonText = 'Ouvert' : this.buttonText = 'Fermé';
    this.foodtruckService.toggleFoodtruckOpen(this.foodtruckDetails).subscribe();
  }

}
