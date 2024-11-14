import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { TasksComponent } from './components/tasks/tasks.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup.component')
          .then(m => m.SignupComponent)
      },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component')
          .then(m => m.HomeComponent),
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'tasks',
            pathMatch: 'full'
          },
          {
            path: 'tasks',
            component: TasksComponent,
          },
          {
            path: 'meetings',
            loadComponent: () => import('./components/meetings/meetings.component')
              .then(m => m.MeetingsComponent)
          },
          {
            path: 'profile',
            loadComponent: () => import('./components/profile/profile.component')
              .then(m => m.ProfileComponent)
          }
        ]
      }
];

/*import { Routes } from '@angular/router';

export const routes: Routes = [];*/
