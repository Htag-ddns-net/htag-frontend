import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService, IManga } from '@app/core/services/manga.service';
import { map, filter, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-manga-edit',
  templateUrl: './manga-edit.component.html',
  styleUrls: ['./manga-edit.component.scss'],
})
export class MangaEditComponent implements OnInit {
  mangaId$: Observable<string>;
  manga$: Observable<IManga>;

  uploadPagesForm = this.fb.group({});

  spinner = false;
  spinnerMode = 'indeterminate';
  spinnerProgress = 0;

  constructor(private route: ActivatedRoute, private api: MangaService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.mangaId$ = this.route.params.pipe(
      map(params => params.id),
      filter(id => !!id),
      distinctUntilChanged(),

      tap(() => console.log('Update Manga ID'))
    );

    this.manga$ = this.mangaId$.pipe(
      switchMap(id => this.api.getManga$(id)),

      tap(() => console.log('Update Manga'))
    );
  }

  removePage(manga: IManga, page: string) {
    const index = manga.pageURLs.indexOf(page);
    const val = manga.pageURLs[index];
    manga.pageURLs[index] = null;

    this.api.delFile$(manga.id, page.substr(page.lastIndexOf('/') + 1)).subscribe(
      () => { },
      () => (manga.pageURLs[index] = val)
    );
  }

  upload(manga: IManga, { files }) {
    if (this.spinner) { return; }
    this.spinner = true;
    this.spinnerMode = 'indeterminate';

    this.api.uploadFiles$(manga.id, files).subscribe(
      event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.loaded === event.total) {
              this.spinnerMode = 'indeterminate';
              break;
            }
            this.spinnerProgress = Math.round(event.loaded / event.total * 100);
            this.spinnerMode = 'determinate';
            break;
          case HttpEventType.Response:
            manga.pageURLs = event.body.pageURLs;
        }
      },
      error => alert(error.message),
      () => this.spinner = false
    );
  }

  delete(manga: IManga) {
    this.api.delManga$(manga.id).subscribe(
      () => this.router.navigate(['/']),
      err => alert(err.message)
    );
  }
}
