import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class DownloaderService {

  imageDownloaderBaseUrl = 'http://localhost:8080/SimpleProxyServer/?';
  constructor(
    private http: HttpClient) { }

  getFile ( imageId: string) {
    const filename = this.imageDownloaderBaseUrl + 'omero_id=' + imageId;
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, {
             headers: {
              'Content-Type': 'image/jpg'
             },
             responseType: 'blob'
           }).pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  }

  private log(filename: string, data: Blob) {
    const message = `DownloaderService downloaded "${filename}" and got "${data}".`;
  }

  private logError(filename: string, error: any) {
    const message = `DownloaderService failed to download "${filename}"; got error "${error.message}".`;
    console.error(message);
  }

//   var deferred = $q.defer();
//     var promise = deferred.promise;
//     $http.get('resources/mock-data/image.jpg', {}, {
//       headers: {
//         'Content-Type': 'image/jpg'
//       },
//       responseType: 'blob'
//     }).then(function(image) {
//       var blob = new Blob([image.data], {
//         type: 'image/jpeg'
//       });
//       var fr = new FileReader();
//       fr.onload = function() {
//         deferred.resolve(fr.result);
//       };
//       fr.readAsDataURL(blob);
//     }, function(error) {
//       deferred.reject(error);
//     });

//     return promise;
}
