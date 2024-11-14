// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  timeZone: string;
  availability: 'AVAILABLE' | 'IN_MEETING' | 'BUSY' | 'OFFLINE' | 'DO_NOT_DISTURB';
  statusMessage?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dashboard">
      <div class="profile-container">
        <div class="profile-card">
          <div class="profile-header">
            <div class="avatar-section">
              <div class="avatar-container">
                <img [src]="profile.avatar" [alt]="profile.name" class="avatar">
                <span class="availability-indicator" [ngClass]="getAvailabilityClass(profile.availability)"></span>
              </div>
              <button class="upload-btn">
                <i class="fas fa-camera"></i>
                Update Photo
              </button>
            </div>

            <div class="profile-info">
              <h1>{{profile.name}}</h1>
              <p class="email">{{profile.email}}</p>
              <div class="timezone-badge">
                <i class="fas fa-globe"></i>
                {{profile.timeZone}}
              </div>
            </div>
          </div>

          <div class="profile-body">
            <form [formGroup]="profileForm" (ngSubmit)="updateProfile()" class="profile-form">
              <div class="form-section">
                <h2>Availability Settings</h2>
                
                <div class="form-group">
                  <label>Current Status</label>
                  <select formControlName="availability" class="form-control">
                    <option value="AVAILABLE">Available</option>
                    <option value="IN_MEETING">In Meeting</option>
                    <option value="BUSY">Busy</option>
                    <option value="DO_NOT_DISTURB">Do Not Disturb</option>
                    <option value="OFFLINE">Offline</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Status Message</label>
                  <input 
                    type="text" 
                    formControlName="statusMessage" 
                    class="form-control"
                    placeholder="Set a status message">
                </div>

                <div class="form-group">
                  <label>Time Zone</label>
                  <select formControlName="timeZone" class="form-control">
                    <option value="UTC+05:30 (IST)">UTC+05:30 (IST)</option>
                    <option value="UTC+00:00 (GMT)">UTC+00:00 (GMT)</option>
                    <option value="UTC-08:00 (PST)">UTC-08:00 (PST)</option>
                    <option value="UTC-05:00 (EST)">UTC-05:00 (EST)</option>
                  </select>
                </div>
              </div>

              <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i> Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;
    }

    .profile-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .profile-header {
      padding: 2rem;
      background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
      color: white;
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .avatar-container {
      position: relative;
      width: 150px;
      height: 150px;
    }

    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .availability-indicator {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
    }

    .available {
      background-color: #10b981;
    }

    .in-meeting {
      background-color: #3b82f6;
    }

    .busy {
      background-color: #f59e0b;
    }

    .offline {
      background-color: #6b7280;
    }

    .do-not-disturb {
      background-color: #ef4444;
    }

    .upload-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      color: white;
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.2s ease;
    }

    .upload-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h1 {
      font-size: 2rem;
      margin: 0 0 0.5rem 0;
      font-weight: 600;
    }

    .email {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 0 0 1rem 0;
    }

    .timezone-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      font-size: 0.875rem;
    }

    .profile-body {
      padding: 2rem;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section h2 {
      font-size: 1.25rem;
      color: #374151;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .form-control {
      width: 100%;
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
      width: 100%;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 131, 176, 0.2);
    }

    .submit-btn:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .profile-container {
        padding: 1rem;
      }

      .avatar-container {
        width: 120px;
        height: 120px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    timeZone: 'UTC+05:30 (IST)',
    availability: 'AVAILABLE',
    statusMessage: 'Working on the new feature'
  };

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      availability: [this.profile.availability],
      statusMessage: [this.profile.statusMessage],
      timeZone: [this.profile.timeZone]
    });
  }

  ngOnInit() {}

  getAvailabilityClass(availability: string): string {
    return availability.toLowerCase().replace('_', '-');
  }

  updateProfile() {
    const formValue = this.profileForm.value;
    this.profile = {
      ...this.profile,
      ...formValue
    };
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', this.profile);
  }
}