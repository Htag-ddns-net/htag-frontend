import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

export type ID = string;

export interface IManga {
  id: ID;
  owner: ID;
  title: string;

  coverUrl: string;
  pageURLs: string[];
  favorite: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IMangaPrev {
  id: ID;
  title: string;
  coverUrl: string;
}

const mapPageURls = (manga: IManga) => ({
  ...manga,
  pageURLs: manga.pageURLs.map(page => '/file/' + manga.id + '/' + page),
  coverUrl: '/file/' + manga.id + '/' + manga.pageURLs[0],
});

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  readonly baseURL = '/api/manga';

  constructor(private http: HttpClient) { }

  getMangas$({ page = 0, limit = 30, search = '' } = {}): Observable<IMangaPrev[]> {
    return this.http.get<IManga[]>(`${this.baseURL}?${search ? 'search=' + search : ''}`).pipe(map(mangas => mangas.map(mapPageURls)));
  }
  getFavorites$(page = 0, limit = 30): Observable<IMangaPrev[]> {
    return this.http.get<IManga[]>(`${this.baseURL}?favorite`).pipe(map(mangas => mangas.map(mapPageURls)));
  }
  getCreated$(page = 0, limit = 30): Observable<IMangaPrev[]> {
    return this.http.get<IManga[]>(`${this.baseURL}?created`).pipe(map(mangas => mangas.map(mapPageURls)));
  }
  getManga$(id: ID): Observable<IManga> {
    return this.http.get<IManga>(`${this.baseURL}/${id}`).pipe(map(mapPageURls));
  }
  favorite$(id: ID, favorite: boolean): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/${id}/favorite`, { favorite });
  }
  createManga$(manga: Partial<IManga>): Observable<IManga> {
    return this.http.post<IManga>(`${this.baseURL}`, manga).pipe(map(mapPageURls));
  }
  uploadFiles$(id: ID, files: FileList) {
    const formData = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    return this.http.post<IManga>(`${this.baseURL}/${id}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => (event.type === HttpEventType.Response) ? { ...event, body: mapPageURls(event.body) } : event));
  }
  updateManga$(id: ID, manga: Partial<Omit<IManga, 'id'>>): Observable<IManga> {
    return this.http.post<IManga>(`${this.baseURL}/${id}`, manga).pipe(map(mapPageURls));
  }
  delManga$(id: ID): Observable<IManga> {
    return this.http.delete<IManga>(`${this.baseURL}/${id}`).pipe(map(mapPageURls));
  }
  delFile$(id: ID, file: string): Observable<IManga> {
    return this.http.delete<IManga>(`${this.baseURL}/${id}/${file}`).pipe(map(mapPageURls));
  }
}
