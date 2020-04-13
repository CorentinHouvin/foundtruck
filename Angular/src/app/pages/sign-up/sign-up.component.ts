import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/user.service';
import { NavbarService } from 'src/app/shared/navbar.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public showSucessMessage: boolean;
  public serverErrorMessages: string;
  public signUpForm: FormGroup;

  // Savoir si le formulaire est submit ou pas - par défaut => false
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public nav: NavbarService
  ) { }

  ngOnInit(): void {
    this.nav.hide();

    this.signUpForm = this.fb.group({
      email: [undefined, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [undefined, [Validators.required, Validators.minLength(4)]],
      role: [undefined, Validators.required]
    });
  }

  signUp() {
    if( this.signUpForm.valid ) {

      this.userService.postUser(this.signUpForm.value).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetForm();
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          } else {
            this.serverErrorMessages = 'Un problème est survenu. Merci de contacter l\'administrateur.';
          }
        }
      );

    }

    this.submitted = true;
  }

  resetForm() {
    this.signUpForm.reset();
    this.serverErrorMessages = '';
    this.submitted = false;
  }
}
