import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';
import { ConsumerService } from 'src/app/services/consumer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public consumerDetails;
  public seeAside;

  constructor(
    private userService: UserService,
    private consumerService: ConsumerService,
    private nav: NavbarService,
    private router: Router
  ) {
    this.nav.show();
    this.consumerService.getConsumer().subscribe(
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

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
