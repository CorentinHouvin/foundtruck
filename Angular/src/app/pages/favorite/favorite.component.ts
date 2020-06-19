import { Component, OnInit } from '@angular/core';

import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html'
})
export class FavoriteComponent implements OnInit {

  public foodtrucks;

  constructor(
    private userService: UserService,
    private foodtruckService: FoodtruckService,
    private nav: NavbarService
  ) {
    this.nav.show();
  }

  ngOnInit(): void {
    this.foodtruckService.getFoodtrucks().subscribe(
      (res) => {
        console.log(res);
        this.foodtrucks = res["foodtrucks"];
      },
      (err) => { }
    );
  }

}
