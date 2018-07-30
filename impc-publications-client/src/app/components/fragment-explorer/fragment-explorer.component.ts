import { Component, OnInit, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'impc-fragment-explorer',
  templateUrl: './fragment-explorer.component.html',
  styleUrls: ['./fragment-explorer.component.css']
})
export class FragmentExplorerComponent implements OnInit {

  @Input()
  public keywords: {};
  public chips: any[] = [];
  public carouselOne: NgxCarousel;

  public selectedFragments: string[] = [];

  constructor() {
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      point: {
        visible: true
      },
      load: 2,
      touch: false,
      loop: true,
      custom: 'banner'
    };
  }

  ngOnInit() {
    this.keywords = Object.keys(this.keywords).reduce((r, e) => {
      if (this.keywords[e].length > 0) { r[e] = this.keywords[e]; }
      return r;
    }, {});
    this.chips = Object.keys(this.keywords).map(keyword => ({label: keyword, selected: false, color: 'accent'})).sort(
      (a, b) => this.keywords[b.label].length - this.keywords[a.label].length
    );
    if (this.chips.length > 0) {
      this.chips[0].selected = true;
      this.filter(this.chips[0].label);
    }
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
 }

 filter(keyword) {
   this.selectedFragments = this.keywords[keyword].map(
     fragment => {
      return fragment.replace(new RegExp(keyword, 'gi'), match => {
        return '<span class="highlightText">' + match + '</span>';
    });
     }
   );
 }

}
