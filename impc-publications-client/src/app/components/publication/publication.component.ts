import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { PublicationsService } from './../../shared/services/publications.service';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Publication } from '../../shared/models/publication.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'impc-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  @HostBinding('class') classes = 'publication';

  public baseUrl = environment.baseUrl;

  @Input() publication: Publication;
  @Input() showActions = false;

  constructor(
    private publicationService: PublicationsService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {}

  ngOnInit() {}

  markAsReviewed(pmid) {
    this.publicationService
      .setPublicationStatus(pmid, true, this.publication.alleles, false, this.publication.consortiumPaper)
      .then(_ => {
        this.openSnackBarUndo('Marked as reviewed', 'markAsReviewed', pmid);
      })
      .catch(data => {
        this.openSnackBar();
      });
  }

  markAsFalsePositive(pmid) {
    this.publicationService
      .setPublicationStatus(pmid, true, this.publication.alleles, true)
      .then(_ => {
        this.openSnackBarUndo(
          'Marked as false positive',
          'markAsFalsePositive',
          pmid
        );
      })
      .catch(data => {
        this.openSnackBar();
      });
  }

  unMarkAsFalsePositive(pmid) {
    const alleleCandidates = this.publication.alleles.filter(
      allele => allele['candidate']
    );
    this.publicationService
      .setPublicationStatus(
        pmid,
        this.publication.reviewed,
        this.publication.alleles,
        false
      )
      .then(_ => {
        this.openSnackBarUndo(
          'Unmarked as false positive',
          'unMarkAsFalsePositive',
          pmid
        );
      })
      .catch(data => {
        this.openSnackBar();
      });
  }

  unMarkAsReviewed(pmid) {
    this.publicationService
      .setPublicationStatus(pmid, false, this.publication.alleles)
      .then(_ => {
        this.openSnackBarUndo(
          'Unmarked as reviewed',
          'markAsFalsePositive',
          pmid
        );
      })
      .catch(data => {
        this.openSnackBar();
      });
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open(
      'You have to login in order to change the status of a publication.',
      'LOGIN',
      {
        duration: 2000
      }
    );
    snackBarRef.onAction().subscribe(_ => {
      this._router.navigateByUrl('/login');
    });
  }

  openSnackBarUndo(message, action, pmid) {
    const snackBarRef = this._snackBar.open(message, 'UNDO', {
      duration: 2000
    });
    snackBarRef.onAction().subscribe(_ => {
      switch (action) {
        case 'markAsReviewed': {
          this.unMarkAsReviewed(pmid);
          break;
        }
        case 'unMarkAsReviewed': {
          this.markAsReviewed(pmid);
          break;
        }
        case 'markAsFalsePositive': {
          this.unMarkAsFalsePositive(pmid);
          break;
        }
        case 'unMarkAsFalsePositive': {
          this.markAsFalsePositive(pmid);
          break;
        }
      }
    });
  }
}
