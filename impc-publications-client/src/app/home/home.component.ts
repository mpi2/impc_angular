import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'impc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentStatus = 'no';
  toggleFilterIcon = 'filter_list';

  constructor() { }

  ngOnInit() {
  }

  changeStatus(status) {
    this.currentStatus = status;
  }

}
