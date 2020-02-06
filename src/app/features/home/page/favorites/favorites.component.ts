import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { IMangaPrev, MangaService } from '@app/core/services/manga.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  mangas: IMangaPrev[] = [];
  sucription: Subscription;

  constructor(private api: MangaService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sucription = this.api.getFavorites$().subscribe(mangas => {
      this.mangas = mangas;
    });
  }

  ngOnDestroy(): void {
    this.sucription.unsubscribe();
  }
}
