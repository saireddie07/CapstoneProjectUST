// tasks.component.ts
/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';*/
// tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';

interface UserDetails {
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
}


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dashboard">
      <div class="tasks-grid">
        <div class="task-card" *ngFor="let task of tasks">
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

            <div class="date-info">
              <div class="date-item">
                <i class="far fa-calendar-plus"></i>
                <span>Assigned: {{task.taskAssignedDate | date:'mediumDate'}}</span>
              </div>
              <div class="date-item">
                <i class="far fa-calendar-check"></i>
                <span>Due: {{task.taskDeadline | date:'mediumDate'}}</span>
              </div>
            </div>

            <form [formGroup]="editForms[task.taskId]" (ngSubmit)="updateTask(task.taskId)" class="task-form">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Modern Dashboard Layout */
    .dashboard {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;
    }

    .dashboard-header {
      margin-bottom: 2rem;
      text-align: center;
      color: #2c3e50;
    }

    .dashboard-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .dashboard-header p {
      color: #6c757d;
      font-size: 1.1rem;
    }

    /* Grid Layout for Tasks */
    .tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    }

    /* Task Card Styling */
    .task-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.2s ease;
    }

    .task-card:hover {
      transform: translateY(-5px);
    }

    .task-card-header {
      padding: 1.5rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .task-card-header h2 {
      font-size: 1.25rem;
      margin: 0;
      font-weight: 600;
    }

    /* Status Badge */
    .status-badge {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-todo {
      background-color: #f59e0b;
    }

    .status-in-progress {
      background-color: #3b82f6;
    }

    .status-completed {
      background-color: #10b981;
    }

    /* Task Card Body */
    .task-card-body {
      padding: 1.5rem;
    }

    .task-description {
      color: #4b5563;
      margin-bottom: 1.5rem;
    }

    .date-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      color: #6b7280;
    }

    .date-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Form Styling */
    .task-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 500;
      color: #374151;
    }

    .form-control {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    .submit-btn {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard {
        padding: 1rem;
      }

      .tasks-grid {
        grid-template-columns: 1fr;
      }

      .task-card-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class TasksComponent implements OnInit {tasks: Task[] = [];
  editForms: { [key: number]: FormGroup } = {};
  userName=localStorage.getItem('currentUser') as string;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit() {
   
    this.taskService.getTaskByUserName(this.userName).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        localStorage.setItem("Token","Ancd");
        console.log(localStorage.getItem("Token"));
        // Initialize form groups for each task
        this.tasks.forEach(task => {
          this.editForms[task.taskId] = this.fb.group({
            status: [task.taskStatus],
            comments: [task.taskRemarks]
          });
        });
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        alert('error');
      }
    });
  }
  
  getStatusClass(status: string): string {
    
    if (!status) {
      return 'todo'; // or return a default status class
    }
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  updateTask(taskId: number) {
    const formValue = this.editForms[taskId].value;
    const taskIndex = this.tasks.findIndex(t => t.taskId === taskId);
    
    if (taskIndex !== -1) {
      this.taskService.updateTaskStatus(taskId, formValue.status, formValue.comments)
        .subscribe({
          next: (updatedTask) => {
            // Update the local tasks array with the response from the server
            this.tasks[taskIndex] = updatedTask;
            console.log('Task updated successfully');
            alert("Task updated");
          },
          error: (error) => {
            console.error('Error updating task:', error);
            alert("Task updation failed:");
            // Optionally, you could revert the local change here
          }
        });
    }
  }
  }


/*constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Mock data - Replace with API call later
    this.tasks = [
      {
        id: 1,
        title: 'Implement User Authentication',
        description: 'Add login and registration functionality with OAuth 2.0 integration and email verification system.',
        assignedDate: new Date('2024-11-10'),
        dueDate: new Date('2024-11-20'),
        status: 'IN_PROGRESS',
        comments: 'Working on the login form and API integration'
      },
      {
        id: 2,
        title: 'Design Database Schema',
        description: 'Create ERD and implement database structure for user management and task tracking system.',
        assignedDate: new Date('2024-11-12'),
        dueDate: new Date('2024-11-25'),
        status: 'TODO',
        comments: ''
      },
      {
        id: 3,
        title: 'Implement Dashboard Analytics',
        description: 'Create interactive charts and metrics for project progress tracking and team performance.',
        assignedDate: new Date('2024-11-15'),
        dueDate: new Date('2024-11-30'),
        status: 'TODO',
        comments: 'Researching chart libraries'
      }
    ];

    // Initialize form groups for each task
    this.tasks.forEach(task => {
      this.editForms[task.id] = this.fb.group({
        status: [task.status],
        comments: [task.comments]
      });
    });
  }
*/


/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <h2>Tasks</h2>
      <p>Your tasks will appear here</p>
    </div>
  `,
  styles: [`
    .component-container {
      padding: 1rem;
    }
  `]
})
export class TasksComponent {}*/