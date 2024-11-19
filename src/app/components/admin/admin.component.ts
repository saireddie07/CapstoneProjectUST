import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="admin-container">
      <nav class="admin-nav">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><a routerLink="/admin/tasks">Tasks</a></li>
          <li><a routerLink="/admin/meetings">Meetings</a></li>
          <li><a routerLink="/admin/approvals">Approval Requests</a></li>
        </ul>
        <button (click)="logout()">Logout</button>
      </nav>
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      min-height: 100vh;
    }
    .admin-nav {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      padding: 20px;
    }
    .admin-nav ul {
      list-style: none;
      padding: 0;
    }
    .admin-nav ul li {
      margin: 10px 0;
    }
    .admin-nav a {
      color: white;
      text-decoration: none;
    }
    .admin-content {
      flex: 1;
      padding: 20px;
    }
    button {
      margin-top: 20px;
      padding: 8px 16px;
      background-color: #e74c3c;
      border: none;
      color: white;
      cursor: pointer;
      border-radius: 4px;
    }
  `]
})
export class AdminComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}