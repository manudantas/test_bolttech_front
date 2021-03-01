import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    public logout(): void {
        this.authService.clearStorage();
        void this.router.navigate(['signin']);
    }
}
