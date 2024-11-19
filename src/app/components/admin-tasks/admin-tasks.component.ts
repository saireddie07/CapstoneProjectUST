import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AuthService } from '../../services/auth.service';

export interface UserDetails {
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  timeZone: string;
  currentStatus: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddTaskComponent],
  template: `
    <div class="dashboard">
      <app-add-task (taskCreated)="onTaskCreated($event)"></app-add-task>
      <div class="tasks-grid">
        <div class="task-card" *ngFor="let task of tasks; trackBy: trackByTaskId">
          <div class="task-card-header">
            <h2>{{task.taskTitle}}</h2>
            <span class="status-badge" [ngClass]="getStatusClass(task.taskStatus)">
              {{task.taskStatus | lowercase}}
            </span>
          </div>

          <div class="task-card-body">
            <div class="task-description">
              <p>{{task.taskDescription}}</p>
            </div>
            <div>
              <p class="clickable-user" (click)="toggleUserDetails(task.userName)">
                Assigned To: {{task.userName}}
              </p>
            </div>

            <div class="date-info">
              <div class="date-item">
                <i class="far fa-calendar-plus"></i>
                <div>Assigned: {{task.taskAssignedDate | date:'mediumDate'}}</div>
              </div>
              
              <ng-container *ngIf="selectedUser === task.userName">
  <div class="user-details" *ngIf="mockUserDetails">
    <div class="user-info-card">
      <h3>User Details</h3>
      <div class="user-info-item">
        <strong>Name:</strong> {{mockUserDetails.username}}
      </div>
      <div class="user-info-item">
        <strong>Email:</strong> {{mockUserDetails.email}}
      </div>
      <div class="user-info-item">
        <strong>Phone:</strong> {{mockUserDetails.phoneNumber}}
      </div>
      <div class="user-info-item">
        <strong>Role:</strong> {{mockUserDetails.role}}
      </div>
      <div class="user-info-item">
        <strong>Time Zone:</strong> {{mockUserDetails.timeZone}}
      </div>
      <div class="user-info-item">
        <strong>Availability:</strong> {{mockUserDetails.currentStatus}}
      </div>
    </div>
  </div>
</ng-container>

              <div class="date-item">
                <i class="far fa-calendar-check"></i>
                <span>Due: {{task.taskDeadline | date:'mediumDate'}}</span>
              </div>
            </div>

            <form [formGroup]="getFormGroup(task.taskId)" (ngSubmit)="updateTask(task.taskId)" class="task-form">
              <div class="form-group">
                <label>Update Status</label>
                <select formControlName="status" class="form-control">
                  <option value="TODO">Todo</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div class="form-group">
                <label>Comments</label>
                <textarea 
                  formControlName="comments"
                  class="form-control"
                  rows="3"
                  placeholder="Add your comments or notes here...">
                </textarea>
              </div>

              <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i> Update Task
              </button>
              <button  class="delete-btn"> 
                <i class="fas fa-trash"></i> Delete Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: 'admin-tasks.component.css'
})
export class AdminTasksComponent implements OnInit {
  tasks: Task[] = [];
  editForms: { [key: number]: FormGroup } = {};
  selectedUser: string | null = null;
  mockUserDetails: UserDetails | null = null;
  userDetailsError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadGetAllTasks();
  }

  trackByTaskId(index: number, task: Task): number {
    return task.taskId;
  }

  getFormGroup(taskId: number): FormGroup {
    if (!this.editForms[taskId]) {
      const task = this.tasks.find(t => t.taskId === taskId);
      this.editForms[taskId] = this.fb.group({
        status: [task?.taskStatus || ''],
        comments: [task?.taskRemarks || '']
      });
    }
    return this.editForms[taskId];
  }

  loadGetAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        // Initialize form groups for each task
        this.tasks.forEach(task => {
          this.editForms[task.taskId] = this.fb.group({
            status: [task.taskStatus],
            comments: [task.taskRemarks]
          });
        });
        // Trigger change detection
        this.tasks = [...this.tasks];
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        alert('error');
      }
    });
  }

  toggleUserDetails(username: string) {
    if (this.selectedUser === username) {
      this.selectedUser = null;
      this.mockUserDetails = null;
      return;
    }
  
    this.selectedUser = username;
    this.userDetailsError = false;
  
    this.authService.getUserByUserName(username).subscribe({
      next: (response) => {
        if (response.isSuccess && response.result) {
          this.mockUserDetails = {
            username: response.result.name,
            email: response.result.email,
            phoneNumber: response.result.phoneNumber,
            role: response.result.role,
            timeZone: response.result.timeZone,
            currentStatus: response.result.currentStatus
          };
        } else {
          this.userDetailsError = true;
          this.mockUserDetails = null;
          console.warn('Failed to fetch user details:', response.message);
        }
      },
      error: (error) => {
        this.userDetailsError = true;
        this.mockUserDetails = null;
        console.error('Error fetching user details:', error);
      }
    });
  }

  onTaskCreated(task: Task) {
    this.tasks.unshift(task);
    // Initialize form group for new task
    this.editForms[task.taskId] = this.fb.group({
      status: [task.taskStatus],
      comments: [task.taskRemarks]
    });
    // Trigger change detection
    this.tasks = [...this.tasks];
  }

  getStatusClass(status: string): string {
    if (!status) {
      return '';
    }
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  updateTask(taskId: number) {
    const formValue = this.editForms[taskId].value;
    const taskIndex = this.tasks.findIndex(t => t.taskId === taskId);
    
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        taskStatus: formValue.status,
        taskRemarks: formValue.comments
      };
      // Trigger change detection
      this.tasks = [...this.tasks];
    }
  }
}