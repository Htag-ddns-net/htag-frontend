import { Component, ViewChild } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn } from '@angular/forms';

const matchValues = (c1, c2): ValidatorFn =>
  (group) => {
    const pass = group.get(c1).value;
    const confirmPass = group.get(c2).value;

    if (pass !== confirmPass) {
      group.get(c1).setErrors({ matchValues: true });
    }
    return null;
  };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading = false;
  errorMessage = '';

  registerForm = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    password: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    rePassword: this.fb.control('', [Validators.required]),
  }, { validators: [matchValues('rePassword', 'password')] });

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get rePassword() { return this.registerForm.get('rePassword'); }

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  onSubmit() {
    if (this.loading) { return; }
    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.registerForm.value;
    this.auth.register$({ username, password }).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.loading = false;
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
