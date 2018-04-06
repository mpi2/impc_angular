export class Publication {
   title: string;
   url: string;
   journal: string;
   authors: string;
   keywords: any;
   datasource: string;
   falsePositive: boolean;
   reviewed: boolean;
   alleles: string[];

   constructor(title: string, url: string, journal: string, authors: string,
    keywords: any, datasource: string, alleles: string[],
    falsePositive: boolean, reviewed: boolean) {
        this.title = title;
        this.url = url;
        this.journal = journal;
        this.authors = authors;
        this.keywords = keywords;
        this.datasource = datasource;
        this.alleles = alleles;
        this.falsePositive = falsePositive;
        this.reviewed = reviewed;
   }
}
