import { Component } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    rePassword: this.fb.control('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  onSubmit() {
    const { username, password } = this.registerForm.value;

    this.auth.register$({ username, password }).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      err => {
        alert(err.message);
      }
    );
  }
}
