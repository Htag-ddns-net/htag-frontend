import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { IMangaPrev, MangaService } from '@app/core/services/manga.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-uploaded',
  templateUrl: './uploaded.component.html',
  styleUrls: ['./uploaded.component.scss'],
})
export class UploadedComponent implements OnInit, OnDestroy {
  mangas: IMangaPrev[] = [];
  sucription: Subscription;

  constructor(private api: MangaService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sucription = this.api.getCreated$().subscribe(mangas => {
      this.mangas = mangas;
    });
  }

  ngOnDestroy(): void {
    this.sucription.unsubscribe();
  }
}
