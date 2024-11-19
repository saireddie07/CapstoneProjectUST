import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { TasksComponent } from './components/tasks/tasks.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminTasksComponent } from './components/admin-tasks/admin-tasks.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { UserMeetingsComponent } from './components/user-meetings/user-meetings.component';

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
            component: UserMeetingsComponent
          },
          {
            path: 'profile',
            loadComponent: () => import('./components/profile/profile.component')
              .then(m => m.ProfileComponent)
          }, 
        ]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard],
        children:[
          {
            path: '',
            redirectTo: 'tasks',
            pathMatch: 'full'
          },
            {
                path:'tasks',
                component:AdminTasksComponent,
            },
            {
              path:'meetings',
              component:MeetingsComponent,
            },
            {
              path:'approvals',
              component:ApprovalsComponent
            }
        ]
    }
];

/*import { Routes } from '@angular/router';

export const routes: Routes = [];*/
