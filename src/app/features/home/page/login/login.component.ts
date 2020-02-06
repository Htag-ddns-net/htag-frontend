import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  onSubmit() {
    const { username, password } = this.loginForm.value;

    this.auth.login$({ username, password }).subscribe(
      () => this.redirectBack(),
      err => {
        alert(err.message);
      }
    );
  }

  redirectBack() {
    if (this.route.snapshot.queryParams.redirectURL) {
      return this.router.navigate([this.route.snapshot.queryParams.redirectURL]);
    } else {
      return this.router.navigate(['/']);
    }
  }
}
