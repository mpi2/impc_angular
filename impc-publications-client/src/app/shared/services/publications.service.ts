import { FragmentsService } from './fragments.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PublicationsService {

  countChanged: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private fragments: FragmentsService) {
  }

  getPublications(start = 1, size = 20, filter = {}): Promise<any> {
    const query = `{
      publications(start: ${start}, size: ${size}, filter: { ${this.objToString(filter)} }){
        title
        authorString
        pmid
        pmcid
        datasource
        falsePositive
        reviewed
        alleles{
          alleleSymbol
        }
        fullTextUrlList{
          url
          documentStyle
        }
        grantsList{
          grantId
          agency
        }
        journalInfo{
          dateOfPublication
          journal{
            title
          }
        }
        fragments{
          EUCOMM
          KOMP
          IMPC
          IKMC
          internationalKnockoutMouseConsortium
          internationalMousePhenotypingConsortium
        }
        cites
        citations {
          pmid
          references
        }
        keyword
        firstPublicationDate
        alleleCandidates
      }
    }`;
    return this.http.post(environment.impcPublicationsApiUrl, query).toPromise()
    .then(response =>
      response['publications'].map((publication) => {
        const impcFragments = publication['fragments']['internationalMousePhenotypingConsortium'];
        delete publication['fragments']['internationalMousePhenotypingConsortium'];
        publication['fragments']['International Mouse Phenotyping Consortium'] = impcFragments;
        const ikcmFragments = publication['fragments']['internationalKnockoutMouseConsortium'];
        delete publication['fragments']['internationalKnockoutMouseConsortium'];
        Object.keys(publication['fragments']).forEach(key => {
          publication['fragments'][key].forEach((fragment, index) => {
            publication['fragments'][key][index] = fragment.replace(new RegExp('<', 'g'), '&lt;').replace(new RegExp('>', 'g'), '&gt;');
          });
        });
        publication['fragments']['International Knockout Mouse Consortium'] = ikcmFragments;
        if (publication['citations'] && publication['citations'].length > 0) {
          publication['citations'].forEach(citation => {
            publication['fragments'][citation['pmid']] = citation['references'];
          }
        );
      }
      if (publication['alleleCandidates'] && publication['alleleCandidates'].length > 0) {
        publication['alleleCandidates'].forEach(alleleCandidate => {
          publication['alleles'].push({alleleSymbol: alleleCandidate, candidate: true});
        }
      );
    }
      if (!publication['fullTextUrlList'] || publication['fullTextUrlList'].length < 1) {
        publication['fullTextUrlList'] = [{'url': 'https://www.ncbi.nlm.nih.gov/pubmed/' + publication['pmid']}];
      }
      return publication;
    }
  ));
}

getPublicationsNumber(status = false) {
  const query = `{ countByReviewed(status: ${status}) }`;
  return this.http.post(environment.impcPublicationsApiUrl, query).toPromise().then(result => result['countByReviewed']);
}

setPublicationStatus(pmid, status = false, alleles = [], falsePositive = false, alleleCandidates = []) {
  let allelesString = '';
  alleles.forEach(
    allele => {
      allelesString += `"${allele.alleleSymbol}",`;
    }
  );
  allelesString = '[' + allelesString.substring(0, allelesString.length - 1) + ']';
  const query = `
  mutation {
    updateReviewed(pmid: "${pmid}", reviewed: ${status}, alleles: ${allelesString}, falsePositive: ${falsePositive}, alleleCandidates: []){
      title
      reviewed
    }
  }`;
  return this.http.post(environment.impcPublicationsApiUrl, query).toPromise().then(
    result => {
      const count = {
        'pending': this.getPublicationsNumber(false),
        'reviewed': this.getPublicationsNumber(true)
      };
      this.countChanged.next(count);
    }
  );
}

objToString (obj) {
  let str = '';
  for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (typeof obj[p] === 'boolean') {
          str += p + ': ' + obj[p] + ', ';
        } else {
          str += p + ': "' + obj[p] + '", ';
        }
      }
  }
  return str.substring(0, str.length - 2);
}

}
