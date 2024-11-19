import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserDetailsResponse } from '../../models/user.interface';

// Define allowed status types as a type
type UserAvailability = 'AVAILABLE' | 'IN_MEETING' | 'BUSY' | 'OFFLINE' | 'DO_NOT_DISTURB';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  avatar: string;
  timeZone: string;
  availability: UserAvailability;
  statusMessage: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = {
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    timeZone: '',
    availability: 'AVAILABLE',
    statusMessage: ''
  };

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      availability: ['AVAILABLE'],
      statusMessage: [''],
      timeZone: ['']
    });
  }

  ngOnInit() {
    const username = localStorage.getItem('currentUser');
    if (username) {
      this.authService.getUserByUserName(username).subscribe({
        next: (response) => {
          if (response.isSuccess && response.result) {
            const userData = response.result;
            
            // Type guard to check availability
            const parseAvailability = (status: string): UserAvailability => {
              const validStatuses: UserAvailability[] = [
                'AVAILABLE', 'IN_MEETING', 'BUSY', 'OFFLINE', 'DO_NOT_DISTURB'
              ];
              return validStatuses.includes(status as UserAvailability) 
                ? status as UserAvailability 
                : 'AVAILABLE';
            };

            this.profile = {
              name: userData.name,
              email: userData.email,
              role: userData.role,
              phoneNumber: userData.phoneNumber,
              avatar: this.profile.avatar,
              timeZone: userData.timeZone || 'UTC+00:00 (GMT)',
              availability: userData.currentStatus 
                ? parseAvailability(userData.currentStatus) 
                : 'AVAILABLE',
              statusMessage: (userData as any).statusMessage || ''
            };

            // Update form with fetched data
            this.profileForm.patchValue({
              availability: this.profile.availability,
              timeZone: this.profile.timeZone,
              statusMessage: this.profile.statusMessage
            });
          }
        },
        error: (error) => {
          console.error('Error fetching user details', error);
        }
      });
    }
  }

  getAvailabilityClass(availability: string): string {
    return availability.toLowerCase().replace('_', '-');
  }

  updateProfile() {
    const username = localStorage.getItem('currentUser');
    if (username) {
      const formValue = this.profileForm.value;
      
      // Prepare update request
      const updateRequest = {
        currentStatus: formValue.availability,
        timeZone: formValue.timeZone
      };

      this.authService.updateUserStatusAndTimezone(username, updateRequest)
        .subscribe({
          next: (response) => {
            if (response.isSuccess) {
              // Update local profile
              this.profile = {
                ...this.profile,
                availability: formValue.availability,
                timeZone: formValue.timeZone,
                statusMessage: formValue.statusMessage
              };
              alert('Profile updated successfully');
            } else {
              alert('Failed to update profile: ' + response.message);
            }
          },
          error: (error) => {
            console.error('Error updating profile', error);
            alert('An error occurred while updating profile');
          }
        });
    }
  }
}