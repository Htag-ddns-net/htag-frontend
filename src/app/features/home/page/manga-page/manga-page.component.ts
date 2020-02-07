import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { map, filter, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IManga, MangaService } from '@app/core/services/manga.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manga-page',
  templateUrl: './manga-page.component.html',
  styleUrls: ['./manga-page.component.scss'],
})
export class MangaPageComponent implements OnInit {
  loading = false;


  mangaId$: Observable<string>;
  manga$: Observable<IManga>;
  page$: Observable<number[]>;

  constructor(private route: ActivatedRoute, private api: MangaService, private element: ElementRef) {}

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

    this.page$ = this.route.params.pipe(
      map(params => parseInt(params.page, 10)),
      filter(page => !isNaN(page) && page >= 0),
      distinctUntilChanged(),
      map(page => [page]),

      tap(() => {
        console.log('Update Page ');
        this.element.nativeElement.offsetParent.scrollTop = 0;
      })
    );
  }
}
