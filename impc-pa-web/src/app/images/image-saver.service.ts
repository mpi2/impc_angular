import { Component, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageSaverService {
 private rootImageUrl = 'http://wwwdev.ebi.ac.uk/mi/media/omero/webgateway/render_image/460595/';
 constructor(private http: HttpClient) { }

 saveFile(imageId: string): Observable<HttpResponse<Response>> {
      // tslint:disable-next-line:max-line-length
      // http://wwwdev.ebi.ac.uk/mi/impc/dev/solr/impc_images/select/?q=*:*&facet=true&facet.limit=-1&facet.field=parameter_stable_id&rows=0&wt=json
      if (imageId == null || imageId === 'None') {
        imageId = '460595';
      }
      console.log('imageId is ' + imageId);
      return this.http.get<Response>(
        this.rootImageUrl + imageId, { observe: 'response' });
  }
  // private saveToFileSystem(response) {
  //   const contentDispositionHeader: string = response.headers.get('Content-Disposition');
  //   const parts: string[] = contentDispositionHeader.split(';');
  //   const filename = parts[1].split('=')[1];
  //   const blob = new Blob([response._body], { type: 'text/plain' });
  //   saveAs(blob, filename);
  // }
}
