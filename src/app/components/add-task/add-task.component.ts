import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.interface';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: 'add-task.component.html',
  styleUrls: ['add-task.component.css']
})
export class AddTaskComponent {
  addTaskForm: FormGroup;
  toEmail:string | undefined;
  message:string | undefined;
  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private fb: FormBuilder, private taskService: TaskService, 
    private emailService: EmailService, private authService: AuthService) {
    this.addTaskForm = this.fb.group({
      taskTitle: new FormControl(''),
      taskDescription: new FormControl(''),
      taskAssignedDate: new FormControl(''),
      taskDeadline: new FormControl(''),
      userName: new FormControl('')
    });
    
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      const newTask: Task = {
        taskId: 0,
        taskTitle: this.addTaskForm.get('taskTitle')?.value,
        taskDescription: this.addTaskForm.get('taskDescription')?.value,
        taskAssignedDate: this.addTaskForm.get('taskAssignedDate')?.value,
        taskDeadline: this.addTaskForm.get('taskDeadline')?.value,
        taskStatus: 'TODO',
        taskRemarks: '',
        userName: this.addTaskForm.get('userName')?.value
      };
      this.toEmail = newTask.userName;
      this.message= `You are assigned to task ${this.addTaskForm.get('taskTitle')?.value} by ${localStorage.getItem('currentUser')}
      
      Please finish the task by ${this.addTaskForm.get('taskDeadline')?.value}`;
      if(this.toEmail)
      {
      
      this.authService.getUserByUserName(newTask.userName).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.taskService.createTask(newTask).subscribe({
              next: (createdTask: Task) => {
                if(this.toEmail && this.message){
                this.taskCreated.emit(createdTask);
                this.addTaskForm.reset();
                this.emailService.sendEmail(this.toEmail, this.message).then(() => {
                   alert('Email sent successfully!');
                   this.toEmail = '';
                   this.message = '';
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      });
              }
            },
              error: (error) => {
                console.error('Error creating task:', error);
              }
            });
          } else {
            alert("No user exists with the given username");
          }
        },
        error: (error) => {
          // Check if it's a 404 with a specific error message
          if (error.status === 404 && error.error?.message) {
            alert(error.error.message);
          } else {
            alert("Error checking username. Please try again.");
          }
        }
      });
      }

      
      
    }
  }
}