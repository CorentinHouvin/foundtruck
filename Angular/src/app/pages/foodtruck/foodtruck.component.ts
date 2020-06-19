import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { NavbarService } from 'src/app/services/navbar.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-foodtruck',
  templateUrl: './foodtruck.component.html'
})
export class FoodtruckComponent implements OnInit {

  constructor(
    private nav: NavbarService,
    private route: ActivatedRoute,
    private foodtruckService: FoodtruckService,
    private _location: Location
    ) { }

  public idFoodtruck: any;
  public foodtruckDetail: any;

  ngOnInit(): void {
    this.nav.show();

    this.route.queryParams.subscribe(params => {
      console.log(params );
      this.idFoodtruck = params._id;

      this.getFoodtruckDetail();
    });
  }

  private getFoodtruckDetail = () => {
    this.foodtruckService.getFoodtruckDetail(this.idFoodtruck).subscribe(
      res => {
        this.foodtruckDetail = res['foodtruck'];
      },
      err => {
        console.log(err);
      }
    );
  }

  public previousPage = () => {
    this._location.back();
  }

}
