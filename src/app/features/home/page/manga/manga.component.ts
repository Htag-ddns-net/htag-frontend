import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService, IManga } from '@app/core/services/manga.service';
import { Observable } from 'rxjs';
import { map, filter, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.scss'],
})
export class MangaComponent implements OnInit {
  mangaId$: Observable<string>;
  manga$: Observable<IManga>;

  constructor(private route: ActivatedRoute, private api: MangaService, public auth: AuthService) {}

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

  favorite(manga: IManga, favorite: boolean) {
    if (favorite === manga.favorite) {
      return;
    }

    const old = manga.favorite;
    manga.favorite = favorite;
    this.api.favorite$(manga.id, favorite).subscribe(
      () => {},
      () => (manga.favorite = old)
    );
  }
}
