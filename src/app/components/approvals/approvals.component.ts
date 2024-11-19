import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'approvals.component.html' ,
  styleUrl: 'approvals.component.css'
})
export class ApprovalsComponent implements OnInit {
  users: User[] = [];
  toEmail:string | undefined;
  message:string | undefined;
  
  constructor(private authService: AuthService, private emailService:EmailService) {}

  ngOnInit() {
    this.loadUnapprovedUsers();
  }

  loadUnapprovedUsers() {
    this.authService.getUnapprovedUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  approveUser(userEmail: string) {
    this.authService.approveUser(userEmail).subscribe({
      next: (res) => {
        this.users = this.users.map(user => 
          user.email === userEmail
            ? { ...user, isApproved: true }
            : user
        );
        if(res.isSuccess) {
          this.toEmail = userEmail
      this.message= 'Congratulations, Your task management account got approved. Now, you can log in with your credentials.'
      this.emailService.sendEmail(this.toEmail, this.message).then(() => {
        alert('Approval Email sent successfully!');
        this.toEmail = '';
        this.message = '';
        this.loadUnapprovedUsers();
})
.catch((error) => {
console.error('Error sending email:', error);
alert('User approved but failed to send email. ');
});
          
        }
      },
      error: (error) => {
        console.error('Error approving user:', error);
      }
    });
  }
}