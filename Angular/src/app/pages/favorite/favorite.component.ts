import { Component, OnInit } from '@angular/core';

import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html'
})
export class FavoriteComponent implements OnInit {

  constructor(private nav: NavbarService) {
    this.nav.show();
  }

  ngOnInit(): void {
  }

}
