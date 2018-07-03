import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'impc-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  public baseUrl = environment.baseUrl;

  constructor() { }

  ngOnInit() {
  }

}
