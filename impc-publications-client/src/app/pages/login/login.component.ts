import { TokenStorage } from './../../shared/services/token-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'impc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  userNameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private _auth: AuthService, private _tokenStorage: TokenStorage, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this._auth.login(this.user).then( data => {
      this._router.navigate(['']);
    }
    );
  }

}
