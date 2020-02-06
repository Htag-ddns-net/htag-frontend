import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { MangaComponent } from './page/manga/manga.component';
import { MangaPageComponent } from './page/manga-page/manga-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { FavoritesComponent } from './page/favorites/favorites.component';
import { MangaEditComponent } from './page/manga-edit/manga-edit.component';
import { AuthGuard } from '@app/core/auth/auth.guard';
import { UploadedComponent } from './page/uploaded/uploaded.component';
import { UploadComponent } from './page/upload/upload.component';
import { AboutComponent } from './page/about/about.component';
import { TermsOfServiceComponent } from './page/terms-of-service/terms-of-service.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },

  { path: 'manga/:id', component: MangaComponent },
  { path: 'manga/:id/edit', component: MangaEditComponent, canActivate: [AuthGuard] },
  { path: 'manga/:id/:page', component: MangaPageComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'uploaded', component: UploadedComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'about', component: AboutComponent },
  { path: 'tos', component: TermsOfServiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
