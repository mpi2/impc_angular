import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'impc-bioschemas-metadata',
  templateUrl: './bioschemas-metadata.component.html',
  styleUrls: ['./bioschemas-metadata.component.css']
})
export class BioschemasMetadataComponent implements OnInit {

  @Input() phenotypeCall: Object;
  bioschemasJSONLD: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.bioschemasJSONLD = this.getSafeHTML(this.phenotypeCall);
  }

  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/\//g, '\\/') : '';
    const html = `${json}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}

class BioschemasPhenotypeCall {
  context: string;
  type: string;
  url: string;
  identifier: string;
  name: string;
}
