import { Component, OnInit } from '@angular/core';

import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public consumerDetails;
  public seeAside;

  constructor(private userService: UserService, private nav: NavbarService) {
    this.nav.show();
    this.userService.getConsumer().subscribe(
      res => {
        console.log(res);
        this.consumerDetails = res['consumer'];
      },
      err => { }
    );
  }

  ngOnInit(): void {
    this.seeAside = false;
  }

  toggleAside() {
    this.seeAside = !this.seeAside;
  }

  checkAside() {
    if (this.seeAside) {
      this.seeAside = !this.seeAside;
    }
  }
}
