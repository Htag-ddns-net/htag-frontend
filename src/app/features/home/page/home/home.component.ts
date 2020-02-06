import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { IMangaPrev, MangaService } from '@app/core/services/manga.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  mangas: IMangaPrev[] = [];
  sucription: Subscription;

  constructor(private api: MangaService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sucription = this.route.queryParams
      .pipe(
        map(params => params.q),
        distinctUntilChanged(),
        switchMap(search => this.api.getMangas$({ search }))
      )
      .subscribe(mangas => {
        this.mangas = mangas;
      });
  }

  ngOnDestroy(): void {
    this.sucription.unsubscribe();
  }
}
