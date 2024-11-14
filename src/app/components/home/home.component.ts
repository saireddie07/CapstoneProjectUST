import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidenavCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidenav() {
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}