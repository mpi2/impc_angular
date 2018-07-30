import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impc-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout();
  }

}
