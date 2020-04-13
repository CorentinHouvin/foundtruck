import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from 'src/app/shared/user.service';
import { NavbarService } from 'src/app/shared/navbar.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public serverErrorMessages: string;
  public signInForm: FormGroup;

  private userDetails;

  // Savoir si le formulaire est submit ou pas - par défaut => false
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    public nav: NavbarService
  ) { }

  ngOnInit(): void {
    this.nav.hide();
    if(this.userService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
          if (this.userDetails.role == 'consumer')
            this.router.navigateByUrl('/mapbox');
          else if (this.userDetails.role == 'foodtruck')
            this.router.navigateByUrl('/dashboard');
        },
        err => { }
      );
    }


    this.signInForm = this.fb.group({
      email: [undefined, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [undefined, [Validators.required]]
    });
  }

  signIn() {
    if (this.signInForm.valid) {
      this.userService.login(this.signInForm.value).subscribe(
        res => {
          this.userService.setToken(res['token']);

          this.userService.getUserProfile().subscribe(
            res => {
              this.userDetails = res['user'];
              if (this.userDetails.role == 'consumer')
                this.router.navigateByUrl('/mapbox');
              else if (this.userDetails.role == 'foodtruck')
                this.router.navigateByUrl('/dashboard');
            },
            err => { }
          );

        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
    this.submitted = true;
  }
}
