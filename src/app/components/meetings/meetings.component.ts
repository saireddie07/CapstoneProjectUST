// meetings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Meeting {
  id: number;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  timeZone: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
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
              <p>{{meeting.description}}</p>
            </div>

            <div class="time-info">
              <div class="time-item">
                <i class="far fa-clock"></i>
                <div class="time-details">
                  <span class="time-label">Starts</span>
                  <span class="time-value">
                    {{meeting.startDateTime | date:'MMM d, y, h:mm a'}}
                  </span>
                </div>
              </div>
              <div class="time-item">
                <i class="far fa-clock"></i>
                <div class="time-details">
                  <span class="time-label">Ends</span>
                  <span class="time-value">
                    {{meeting.endDateTime | date:'MMM d, y, h:mm a'}}
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

            <div class="duration-badge">
              <i class="far fa-hourglass"></i>
              {{getDuration(meeting.startDateTime, meeting.endDateTime)}}
            </div>

           
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

    /* Form Styling */
    .meeting-form {
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
      border-color: #0083b0;
      box-shadow: 0 0 0 3px rgba(0, 131, 176, 0.1);
    }

    .submit-btn {
      background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
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
      box-shadow: 0 4px 6px rgba(0, 131, 176, 0.2);
    }

    .submit-btn:active {
      transform: translateY(0);
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
  meetings: Meeting[] = [];
  editForms: { [key: number]: FormGroup } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Mock data - Replace with API call later
    this.meetings = [
      {
        id: 1,
        title: 'Weekly Team Sync',
        description: 'Discuss project progress, blockers, and upcoming deliverables with the development team.',
        startDateTime: new Date('2024-11-14T10:00:00'),
        endDateTime: new Date('2024-11-14T11:00:00'),
        timeZone: 'UTC+05:30 (IST)',
        status: 'SCHEDULED'
      },
      {
        id: 2,
        title: 'Client Project Review',
        description: 'Monthly review meeting with client stakeholders to present progress and gather feedback.',
        startDateTime: new Date('2024-11-15T15:30:00'),
        endDateTime: new Date('2024-11-15T17:00:00'),
        timeZone: 'UTC+05:30 (IST)',
        status: 'SCHEDULED'
      },
      {
        id: 3,
        title: 'Sprint Planning',
        description: 'Plan and prioritize tasks for the upcoming sprint with the development team.',
        startDateTime: new Date('2024-11-16T11:00:00'),
        endDateTime: new Date('2024-11-16T12:30:00'),
        timeZone: 'UTC+05:30 (IST)',
        status: 'SCHEDULED'
      }
    ];

    // Initialize form groups for each meeting
    this.meetings.forEach(meeting => {
      this.editForms[meeting.id] = this.fb.group({
        status: [meeting.status]
      });
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  getDuration(start: Date, end: Date): string {
    const durationMs = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  updateMeeting(meetingId: number) {
    const formValue = this.editForms[meetingId].value;
    const meetingIndex = this.meetings.findIndex(m => m.id === meetingId);
    
    if (meetingIndex !== -1) {
      this.meetings[meetingIndex] = {
        ...this.meetings[meetingIndex],
        ...formValue
      };
    }
  }
}