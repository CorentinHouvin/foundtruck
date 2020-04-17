import { Component, OnInit } from '@angular/core';

import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  constructor(private nav: NavbarService) {
    this.nav.show();
  }

  ngOnInit(): void {
  }

}
