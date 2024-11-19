import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="home-container" [class.collapsed-sidenav]="isSidenavCollapsed">
      <!-- Sidenav -->
      <nav class="sidenav" [class.collapsed]="isSidenavCollapsed">
        <div class="sidenav-header">
          <div class="logo-container">
            <div class="logo-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="logo-text" [class.hidden]="isSidenavCollapsed">Workspace</span>
          </div>
          <button class="toggle-btn" (click)="toggleSidenav()">
            <svg *ngIf="!isSidenavCollapsed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <svg *ngIf="isSidenavCollapsed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <div class="sidenav-content">
          <a routerLink="tasks" routerLinkActive="active" class="nav-item">
            <div class="nav-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11.5h6M9 15.5h6M15.3 19.1L19 21l-3-8.7M15.3 4.9L19 3l-3 8.7M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"/>
              </svg>
            </div>
            <span class="nav-text" [class.hidden]="isSidenavCollapsed">Tasks</span>
            <span class="nav-badge"></span>
          </a>
          <a routerLink="meetings" routerLinkActive="active" class="nav-item">
            <div class="nav-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <span class="nav-text" [class.hidden]="isSidenavCollapsed">Meetings</span>
            <span class="nav-badge warning"></span>
          </a>
          <!--<a routerLink="messages" routerLinkActive="active" class="nav-item">
            <div class="nav-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span class="nav-text" [class.hidden]="isSidenavCollapsed">Messages</span>
            <span class="nav-badge success">3</span>
          </a>-->
          <a routerLink="profile" routerLinkActive="active" class="nav-item">
            <div class="nav-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span class="nav-text" [class.hidden]="isSidenavCollapsed">Profile</span>
          </a>
        </div>

        <div class="sidenav-footer">
          <button (click)="logout()" class="logout-btn">
            <div class="nav-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <span class="nav-text" [class.hidden]="isSidenavCollapsed">Logout</span>
          </button>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <header class="main-header">
          <div class="header-content">
            <!--<div class="search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" placeholder="Search..." class="search-input">
            </div>-->
            <!--<div class="header-actions">
              <button class="action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span class="notification-dot"></span>
              </button>
              <div class="user-profile">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="User" class="user-avatar">
                <div class="user-info" [class.hidden]="isSidenavCollapsed">
                  <span class="user-name">John Doe</span>
                  <span class="user-role">Admin</span>
                </div>
              </div>
            </div>-->
          </div>
        </header>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      min-height: 100vh;
      background-color: #f3f4f6;
      color: #111827;
    }
    
    /* Sidenav Styles */
    .sidenav {
      width: 280px;
      background: linear-gradient(180deg, #1e1b4b 0%, #312e81 100%);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 50;
    }
    
    .sidenav.collapsed {
      width: 80px;
    }
    
    .sidenav-header {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .logo-wrapper {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.75rem;
      border-radius: 12px;
      color: #fff;
    }
    
    .logo-text {
      font-size: 1.25rem;
      font-weight: 600;
      color: #fff;
      transition: all 0.3s ease;
    }
    
    .logo-text.hidden {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    
    
    
    .toggle-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    
    .toggle-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .sidenav-content {
      flex: 1;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.875rem 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.2s ease;
      border-radius: 12px;
      position: relative;
    }
    .nav-item:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
    
    .nav-item.active {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
      font-weight: 500;
    }
    .nav-icon-wrapper {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .nav-text {
      margin-left: 1rem;
      font-size: 0.9375rem;
      transition: all 0.3s ease;
    }
    
    .nav-text.hidden {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    
    
    
    .nav-icon {
      font-size: 1.1rem;
    }
    
    .nav-text {
      font-size: 0.9375rem;
      transition: opacity 0.3s ease;
    }
    
    .nav-text.hidden {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    
    .sidenav-footer {
      padding: 1rem 0.75rem;
      border-top: 1px solid #e2e8f0;
    }
    
    .logout-btn {
      width: 100%;
      padding: 0.875rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      background: none;
      border: none;
      color: #ef4444;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
    }
    
    .logout-btn:hover {
      background-color: #fef2f2;
    }
    
    /* Main Content Styles */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    
    .main-header {
      
      background-color: linear-gradient(180deg, #1e1b4b 0%, #312e81 100%);
      border-bottom: 1px solid #e2e8f0;
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .breadcrumb {
      font-size: 1.25rem;
      font-weight: 600;
      color: #0f172a;
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .user-name {
      font-size: 0.9375rem;
      font-weight: 500;
      color: #64748b;
    }
    
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #e2e8f0;
    }
    
    .content {
      padding: 2rem;
      flex: 1;
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
      .sidenav {
        position: fixed;
        height: 100vh;
        z-index: 1000;
        transform: translateX(0);
      }
    
      .sidenav.collapsed {
        transform: translateX(-100%);
      }
    
      .collapsed-sidenav .main-content {
        margin-left: 0;
      }
    
      .main-content {
        margin-left: 280px;
        transition: margin-left 0.3s ease;
      }
    }
  `]
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