import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PublicationsService {
  countChanged: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  getPublications(start = 1, size = 20, filter = {}): Promise<any> {
    const query = `{
      publications(start: ${start}, size: ${size}, ${this.parseFilter(
      filter
    )} ){
        title
        authorString
        pmid
        pmcid
        datasource
        falsePositive
        consortiumPaper
        reviewed
        alleles{
          acc
          gacc
          geneSymbol
          project
          alleleName
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
        alleleCandidates {
          acc
          gacc
          geneSymbol
          project
          alleleName
          alleleSymbol
        }
      }
    }`;
    return this.http
      .post(
        environment.impcPublicationsApiUrl,
        this.constructQuery(query.replace(new RegExp(/\n/, 'g'), ' '))
      )
      .toPromise()
      .then(response =>
        response['data']['publications'].map(publication => {
          const impcFragments =
            publication['fragments']['internationalMousePhenotypingConsortium'];
          delete publication['fragments'][
            'internationalMousePhenotypingConsortium'
          ];
          publication['fragments'][
            'International Mouse Phenotyping Consortium'
          ] = impcFragments;
          const ikcmFragments =
            publication['fragments']['internationalKnockoutMouseConsortium'];
          delete publication['fragments'][
            'internationalKnockoutMouseConsortium'
          ];
          Object.keys(publication['fragments']).forEach(key => {
            publication['fragments'][key].forEach((fragment, index) => {
              publication['fragments'][key][index] = fragment
                .replace(new RegExp('<', 'g'), '&lt;')
                .replace(new RegExp('>', 'g'), '&gt;');
            });
          });
          publication['fragments'][
            'International Knockout Mouse Consortium'
          ] = ikcmFragments;
          if (publication['citations'] && publication['citations'].length > 0) {
            publication['citations'].forEach(citation => {
              publication['fragments'][citation['pmid']] =
                citation['references'];
            });
          }
          if (
            publication['alleleCandidates'] &&
            publication['alleleCandidates'].length > 0
          ) {
            publication['alleleCandidates'].forEach(alleleCandidate => {
              publication['alleles'].push({
                candidate: true,
                ...alleleCandidate
              });
            });
          }
          if (
            !publication['fullTextUrlList'] ||
            publication['fullTextUrlList'].length < 1
          ) {
            publication['fullTextUrlList'] = [
              {
                url:
                  'https://www.ncbi.nlm.nih.gov/pubmed/' + publication['pmid']
              }
            ];
          }
          return publication;
        })
      );
  }

  getPublicationsNumber(filter: any) {
    const query = `{ count(${this.parseFilter(filter)}) }`;
    return this.http
      .post(environment.impcPublicationsApiUrl, this.constructQuery(query))
      .toPromise()
      .then(result => result['data']['count']);
  }

  setPublicationStatus(
    pmid,
    status = false,
    alleles = [],
    falsePositive = false,
    consortiumPaper = false
  ) {
    let allelesString = '';
    alleles.forEach(allele => {
      const alleleref = Object.assign({}, allele);
      delete alleleref['candidate'];
      allelesString += `{ ${this.objToString(alleleref)} }, `;
    });
    allelesString =
      '[' + allelesString.substring(0, allelesString.length - 2) + ']';
    const query = `
  mutation {
    updateReviewed(
    pmid: \\"${pmid}\\",
    reviewed: ${status},
    alleles: ${allelesString},
    falsePositive: ${falsePositive},
    consortiumPaper: ${consortiumPaper},
    alleleCandidates: []
    ){
      title
      reviewed
    }
  }`;
    return this.http
      .post(
        environment.impcPublicationsApiUrl,
        this.constructQuery(query.replace(new RegExp(/\n/, 'g'), ' '))
      )
      .toPromise()
      .then(result => {
        const count = {
          pending: this.getPublicationsNumber({ reviewed: false }),
          reviewed: this.getPublicationsNumber({ reviewed: true, falsePositive: false }),
          falsePsotive: this.getPublicationsNumber({ falsePositive: true })
        };
        this.countChanged.next(count);
      });
  }

  parseFilter(obj) {
    let str = '';
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (p !== 'keywords') {
          str += p + ': ' + obj[p] + ', ';
        } else {
          str += p + ': [\\"' + obj[p].join('\\",\\"') + '\\"], ';
        }
      }
    }
    return str.substring(0, str.length - 2);
  }

  objToString(obj) {
    let str = '';
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (typeof obj[p] === 'boolean') {
          str += p + ': ' + obj[p] + ', ';
        } else {
          str += p + ': \\"' + obj[p] + '\\", ';
        }
      }
    }
    return str.substring(0, str.length - 2);
  }

  constructQuery(queryStr) {
    return `{"query":"${queryStr}","variables":null,"operationName":null}`;
  }
}
