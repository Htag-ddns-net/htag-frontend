import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MangaService } from '@app/core/services/manga.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  createForm = this.fb.group({
    title: this.fb.control('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private api: MangaService, private router: Router) {}

  submit() {
    const { title } = this.createForm.value;

    this.api
      .createManga$({
        title,
      })
      .subscribe(
        manga => this.router.navigate(['/manga', manga.id, 'edit']),
        err => alert(err.message)
      );
  }
}
