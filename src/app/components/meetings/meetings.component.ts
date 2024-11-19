// meetings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Meeting, MeetingDetails } from '../../models/meetings.interface'
import { AddMeetingComponent } from "../add-meeting/add-meeting.component";
import { MeetingService } from '../../services/meetings.service';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddMeetingComponent],
  template: `
  <app-add-meeting/>
    <div class="dashboard">
      <div class="meetings-grid">
        <div class="meeting-card" *ngFor="let meeting of meetings">
          <div class="meeting-card-header">
            <h2>{{meeting.title}}</h2>
            <span class="status-badge" [ngClass]="getStatusClass(meeting.status)">
              {{meeting.status | lowercase }}
            </span>
          </div>

          <div class="meeting-card-body">
            <div class="meeting-description">
              <p>MeetingId: {{meeting.id}}</p><br/>
              <p>{{meeting.description}}</p>
            </div>

            <div class="time-info">
              <div class="time-item">
                <i class="far fa-clock"></i>
                <div class="time-details">
                  <span class="time-label">Starts</span>
                  <span class="time-value">
                    {{meeting.startTime | date:'MMM d, y, h:mm a'}}
                  </span>
                </div>
              </div>
              <div class="time-item">
                <i class="far fa-clock"></i>
                <div class="time-details">
                  <span class="time-label">Ends</span>
                  <span class="time-value">
                    {{meeting.endTime | date:'MMM d, y, h:mm a'}}
                  </span>
                </div>
              </div>
              <div class="time-item">
                <i class="fas fa-globe"></i>
                <div class="time-details">
                  <span class="time-label">Time Zone</span>
                  <span class="time-value">{{meeting.timeZone}}</span>
                </div>
              </div>
            </div>
            
            <div class="meeting-description">
              Meeting Link: <a [href]="meeting.meetingLink">{{meeting.meetingLink}}</a>
            </div>

            <div class="duration-badge">
              <i class="far fa-hourglass"></i>
              {{getDuration(meeting.startTime, meeting.endTime)}}
            </div>

            <!-- Added participants list using existing styling -->
            <div class="meeting-description">
              <p><strong>Participants:</strong></p>
              <div *ngIf="hasParticipants(meeting)">
                <p *ngFor="let participant of meeting.participants">
                  - {{participant.userId}}
                </p>
              </div>
              <p *ngIf="!hasParticipants(meeting)">No participants added yet</p>
            </div>

            <div class="button-container">
              <button class="add-participant-btn" (click)="addParticipant(meeting.id,meeting)">
                <span class="icon">➕</span>
                Add Participant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Dashboard Layout */
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

    /* Grid Layout for Meetings */
    .meetings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    }

    /* Meeting Card Styling */
    .meeting-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.2s ease;
    }

    .meeting-card:hover {
      transform: translateY(-5px);
    }

    .meeting-card-header {
      padding: 1.5rem;
      background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .meeting-card-header h2 {
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

    .status-scheduled {
      background-color: #3b82f6;
    }

    .status-in-progress {
      background-color: #10b981;
    }

    .status-completed {
      background-color: #6366f1;
    }

    .status-cancelled {
      background-color: #ef4444;
    }

    /* Meeting Card Body */
    .meeting-card-body {
      padding: 1.5rem;
    }

    .meeting-description {
      color: #4b5563;
      margin-bottom: 1.5rem;
    }

    /* Time Information */
    .time-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background-color: #f8fafc;
      border-radius: 8px;
    }

    .time-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: #64748b;
    }

    .time-item i {
      font-size: 1.2rem;
      color: #0083b0;
    }

    .time-details {
      display: flex;
      flex-direction: column;
    }

    .time-label {
      font-size: 0.875rem;
      color: #64748b;
    }

    .time-value {
      font-weight: 500;
      color: #334155;
    }

    /* Duration Badge */
    .duration-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #e0f2fe;
      color: #0369a1;
      border-radius: 20px;
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    /* Button Container */
    .button-container {
      text-align: center;
    }

    .add-participant-btn {
      background-color: #2c3e50;
      color: white;
      border: none;
      border-radius: 25px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;
    }

    .add-participant-btn .icon {
      font-size: 18px;
    }

    .add-participant-btn:hover {
      background-color: #45a049;
      transform: scale(1.05);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    }

    .add-participant-btn:active {
      background-color: #3e8e41;
      transform: scale(1);
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard {
        padding: 1rem;
      }

      .meetings-grid {
        grid-template-columns: 1fr;
      }

      .meeting-card-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class MeetingsComponent implements OnInit {
  meetings: MeetingDetails[] = [];
  editForms: { [key: number]: FormGroup } = {};
  toEmail:string | undefined;
  message:string | undefined;
  constructor(private fb: FormBuilder,
    private emailService:EmailService,
    private meetingService: MeetingService, private authService: AuthService) {}

  hasParticipants(meeting: MeetingDetails): boolean {
    return Array.isArray(meeting.participants) && meeting.participants.length > 0;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  getDuration(start: string, end: string): string {
    const durationMs = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  addParticipant(meetingId: number,meeting:MeetingDetails) {
    let check=false;
    let userId = prompt('Please enter the user ID to add as participant:');
    if (!userId) {
      alert('User ID is required to add a participant.');
      return;
    }
    this.toEmail =userId;
    this.message= `You are scheduled to meeting ${meeting.title} at ${meeting.startTime} ${meeting.timeZone}. 
    Please join with the given link ${meeting.meetingLink}`;
    this.authService.getUserByUserName(userId).subscribe({
      next: (response) =>{
        console.log(response.isSuccess);
        if(response.isSuccess && userId)
        {
          this.meetingService.addParticipant(meetingId, userId).subscribe({
            next: (response) => {
              if(this.toEmail && this.message)
              {
                
              this.emailService.sendEmail(this.toEmail, this.message).then(() => {
                alert('Participant added. Email sent successfully!');
                this.toEmail = '';
                this.message = '';
   })
   .catch((error) => {
     console.error('Error sending email:', error);
     alert('Participant added but failed to send email.');
   });
              }
              // Refresh the meetings list to show the new participant
              this.loadMeetings();
            },
            error: (error) => {
              alert('Error adding participant: ' + error.message);
            }
          });
        }
        else{
          alert("There is no user in exist with the given username");
        }
      },
      error:(error)=>{
        alert("There is no user in exist with the given username");
      }});
     
  }

  loadMeetings() {
    this.meetingService.getAllMeetings().subscribe({
      next: (res) => {
        this.meetings = res;
      },
      error: (error) => {
        alert('Error loading meetings: ' + error.message);
      }
    });
  }

  ngOnInit() {
    this.loadMeetings();
  }
}