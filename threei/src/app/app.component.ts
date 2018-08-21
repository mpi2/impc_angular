import { Component } from '@angular/core';
import { AppService } from '../app/service/app.service';
import { Router } from '../../node_modules/@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  imageUrlArray = ["/assets/images/slider/ANA746a.jpg", "/assets/images/slider/CD8cellattacking745.jpg", "/assets/images/slider/Diff_count_5b10e.jpg",
    "/assets/images/slider/Ear_epidermis_resized_0ba5a.png", "/assets/images/slider/FACS_Plot_resized7d67.png",
    "/assets/images/slider/GutL3_lowvac_0040_small0a9d.jpg", "/assets/images/slider/Influenza_in_respiratory_tract-resized_11752.jpg",
    "/assets//images/slider/Macrophage_infected1639E47-resized074c.jpg", "/assets/images/slider/Neutrophil-resizedda33.jpg",
    "/assets/images/slider/Salmonella-resized145f.jpg"];

  constructor(private appService: AppService,
              private router: Router) {

  }

  onClick() {
    // alert('link clicked!');
    // Compute month based on date
    this.appService.phenoType = this.getMonth();
    this.router.navigate(['/phenotypeofthemonth']);
  }

  getMonth(): string {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[d.getMonth()];
  }

}
