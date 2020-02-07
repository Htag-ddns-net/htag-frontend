import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { MangaComponent } from './page/manga/manga.component';
import { MangaPageComponent } from './page/manga-page/manga-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { UploadComponent } from './page/upload/upload.component';
import { FavoritesComponent } from './page/favorites/favorites.component';
import { MangaEditComponent } from './page/manga-edit/manga-edit.component';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatProgressBarModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadedComponent } from './page/uploaded/uploaded.component';
import { AboutComponent } from './page/about/about.component';
import { TermsOfServiceComponent } from './page/terms-of-service/terms-of-service.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MangaComponent,
    MangaPageComponent,
    ProfileComponent,
    UploadComponent,
    FavoritesComponent,
    MangaEditComponent,
    UploadedComponent,
    AboutComponent,
    TermsOfServiceComponent,
  ],
  imports: [
    // Shared module
    SharedModule,

    // Routing
    HomeRoutingModule,

    // Other
    ReactiveFormsModule,
    LazyLoadImageModule,

    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    MatCardModule,

    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
})
export class HomeModule { }
