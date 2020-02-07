import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay, switchMap, filter, takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<void>();

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.initAuth();

    combineLatest([this.isHandset$, this.router.events])
      .pipe(
        filter(([v, o]) => v),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => this.drawer.close());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  search(text: string) {
    this.router.navigate(['/'], { queryParams: { q: text } });
  }
}
