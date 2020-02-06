import { Component } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
