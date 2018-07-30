import { Allele } from './allele.model';
import { FullTextUrl } from './fulltext-url.model';


export class Publication {
   title: string;
   fullTextUrlList: FullTextUrl[];
   journal: string;
   authorString: string;
   keywords: any;
   datasource: string;
   falsePositive: boolean;
   reviewed: boolean;
   alleles: Allele[];
   firstPublicationDate: String;
   cites: any;
   journalInfo: any;
   authors: any;
   fragments: any;

   constructor(title: string, fullTextUrlList: FullTextUrl[], journal: string, authorString: string,
    keywords: any, datasource: string, alleles: Allele[],
    falsePositive: boolean, reviewed: boolean, firstPublicationDate: String) {
        this.title = title;
        this.fullTextUrlList = fullTextUrlList;
        this.journal = journal;
        this.authorString = authorString;
        this.keywords = keywords;
        this.datasource = datasource;
        this.alleles = alleles;
        this.falsePositive = falsePositive;
        this.reviewed = reviewed;
        this.firstPublicationDate = firstPublicationDate;
   }
}
